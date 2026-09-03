import dietData from "../diet/dietData";

import {
  calculateNutritionSummary,
} from "../diet/nutritionUtils";

import workoutPlans from "../workout/workoutData";


/*
 * =========================================================
 * GET USER ID
 * =========================================================
 */

function getUserId() {

  return Number(
    localStorage.getItem(
      "fitstatsUserId"
    ) || "1"
  );

}


/*
 * =========================================================
 * GET SAVED CALCULATOR DATA
 * =========================================================
 */

export function getCalculatorData() {

  const savedResults =
    localStorage.getItem(
      "fitstatsCalculatorResults"
    );


  if (!savedResults) {
    return null;
  }


  try {

    return JSON.parse(
      savedResults
    );

  } catch {

    return null;

  }

}


/*
 * =========================================================
 * GET CALORIE TARGET
 * =========================================================
 */

export function getCalorieTarget() {

  const savedCalories =
    localStorage.getItem(
      "fitstatsCalorieTarget"
    );


  if (savedCalories) {

    const calories =
      Number(savedCalories);


    if (
      Number.isFinite(calories) &&
      calories > 0
    ) {

      return calories;

    }

  }


  const calculatorData =
    getCalculatorData();


  if (
    calculatorData?.goalCalories
  ) {

    return Number(
      calculatorData.goalCalories
    );

  }


  return 2200;

}


/*
 * =========================================================
 * GET DIET TYPE
 * =========================================================
 */

function getDietType() {

  const savedPreference =
    localStorage.getItem(
      "fitstatsDietPreference"
    );


  if (
    savedPreference ===
    "nonVegetarian"
  ) {

    return "nonVegetarian";

  }


  return "vegetarian";

}


/*
 * =========================================================
 * GET TODAY'S DATE
 * =========================================================
 */

function getTodayDateString() {

  const today =
    new Date();


  const year =
    today.getFullYear();


  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;

}


/*
 * =========================================================
 * GET SAVED MEAL SELECTIONS
 * =========================================================
 */

function getSavedMealSelections(
  targetCalories,
  dietType
) {

  const storageKey =
    `fitstatsMealSelections_${targetCalories}_${dietType}`;


  const savedSelections =
    localStorage.getItem(
      storageKey
    );


  if (!savedSelections) {

    return {
      breakfast: 0,
      lunch: 0,
      snack: 0,
      dinner: 0,
    };

  }


  try {

    return JSON.parse(
      savedSelections
    );

  } catch {

    return {
      breakfast: 0,
      lunch: 0,
      snack: 0,
      dinner: 0,
    };

  }

}


/*
 * =========================================================
 * GET TODAY'S COMPLETED MEALS
 * =========================================================
 */

function getCompletedMeals(
  targetCalories,
  dietType
) {

  const today =
    new Date().toDateString();


  const storageKey =
    `fitstatsCompletedMeals_${targetCalories}_${dietType}_${today}`;


  const savedCompletedMeals =
    localStorage.getItem(
      storageKey
    );


  if (!savedCompletedMeals) {

    return {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
    };

  }


  try {

    return JSON.parse(
      savedCompletedMeals
    );

  } catch {

    return {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
    };

  }

}


/*
 * =========================================================
 * BUILD SELECTED MEALS
 * =========================================================
 */

function getSelectedMeals(
  targetCalories,
  dietType
) {

  const selectedIndexes =
    getSavedMealSelections(
      targetCalories,
      dietType
    );


  const meals =
    dietData[dietType] ||
    dietData.vegetarian;


  const mealSections = [

    {
      key: "breakfast",
      percentage: 0.25,
    },

    {
      key: "lunch",
      percentage: 0.35,
    },

    {
      key: "snack",
      percentage: 0.15,
    },

    {
      key: "dinner",
      percentage: 0.25,
    },

  ];


  return mealSections.map(
    (section) => {

      const availableMeals =
        meals[section.key] ||
        [];


      const selectedIndex =
        selectedIndexes[
          section.key
        ] ?? 0;


      const meal =
        availableMeals[
          selectedIndex
        ];


      return {
        ...section,
        meal,
      };

    }
  );

}


/*
 * =========================================================
 * GET TODAY'S NUTRITION
 * =========================================================
 */

export function getDashboardNutrition() {

  const targetCalories =
    getCalorieTarget();


  const dietType =
    getDietType();


  const selectedMeals =
    getSelectedMeals(
      targetCalories,
      dietType
    );


  const completedMeals =
    getCompletedMeals(
      targetCalories,
      dietType
    );


  return calculateNutritionSummary(
    selectedMeals,
    completedMeals,
    targetCalories
  );

}


/*
 * =========================================================
 * GET DATABASE WORKOUT PROGRESS
 * =========================================================
 */

export async function getDashboardWorkout() {

  const selectedSplit =
    Number(
      localStorage.getItem(
        "fitstatsSelectedSplit"
      ) || "3"
    );


  const workoutPlan =
    workoutPlans[
      selectedSplit
    ] || [];


  const totalExercises =
    workoutPlan.reduce(
      (total, day) =>
        total +
        day.exercises.length,
      0
    );


  const totalDays =
    workoutPlan.length;


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/workout/${getUserId()}`
      );


    if (!response.ok) {

      throw new Error(
        "Unable to fetch workout progress."
      );

    }


    const data =
      await response.json();


    const progressRows =
      data.progress || [];


    const completedExerciseNames =
      new Set(
        progressRows
          .filter(
            (row) =>
              Boolean(
                row.completed
              )
          )
          .map(
            (row) =>
              `${row.workout_day}-${row.exercise_name}`
          )
      );


    const completedExercises =
      completedExerciseNames.size;


    const exercisePercentage =
      totalExercises === 0
        ? 0
        : Math.min(
            100,
            Math.round(
              (
                completedExercises /
                totalExercises
              ) * 100
            )
          );


    const completedDayNumbers =
      new Set();


    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      const dayPlan =
        workoutPlan.find(
          (item) =>
            Number(item.day) ===
            day
        );


      if (!dayPlan) {
        continue;
      }


      const dayExercises =
        dayPlan.exercises.map(
          (exercise) =>
            `${day}-${exercise.name}`
        );


      const allCompleted =
        dayExercises.length > 0 &&
        dayExercises.every(
          (exerciseKey) =>
            completedExerciseNames.has(
              exerciseKey
            )
        );


      if (allCompleted) {

        completedDayNumbers.add(
          day
        );

      }

    }


    const completedDays =
      completedDayNumbers.size;


    const dayPercentage =
      totalDays === 0
        ? 0
        : Math.min(
            100,
            Math.round(
              (
                completedDays /
                totalDays
              ) * 100
            )
          );


    return {

      selectedSplit,

      completedExercises,

      totalExercises,

      exercisePercentage,

      completedDays,

      totalDays,

      dayPercentage,

    };

  } catch (error) {

    console.error(
      "Dashboard workout error:",
      error
    );


    return {

      selectedSplit,

      completedExercises: 0,

      totalExercises,

      exercisePercentage: 0,

      completedDays: 0,

      totalDays,

      dayPercentage: 0,

    };

  }

}


/*
 * =========================================================
 * CONVERT DATABASE DATE TO LOCAL DATE
 * =========================================================
 */

function normalizePlannerDate(
  taskDate
) {

  if (!taskDate) {
    return "";
  }


  /*
   * MySQL DATE values can arrive from
   * mysql2 as JavaScript Date objects
   * or ISO strings.
   *
   * We convert them to the user's
   * local date instead of simply taking
   * the first 10 characters.
   *
   * Example:
   *
   * 2026-09-03T18:30:00.000Z
   *
   * becomes:
   *
   * 2026-09-04
   *
   * for India (IST).
   */

  const date =
    new Date(taskDate);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;

}


/*
 * =========================================================
 * GET DATABASE PLANNER PROGRESS
 * =========================================================
 */

export async function getDashboardPlanner() {

  const today =
    getTodayDateString();


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/planner/${getUserId()}`
      );


    if (!response.ok) {

      throw new Error(
        "Unable to fetch planner tasks."
      );

    }


    const data =
      await response.json();


    const allTasks =
      data.tasks || [];


    /*
     * Compare the normalized local
     * database date with today's
     * local date.
     */

    const todayTasks =
      allTasks.filter(
        (task) =>
          normalizePlannerDate(
            task.task_date
          ) === today
      );


    const totalTasks =
      todayTasks.length;


    const completedTasks =
      todayTasks.filter(
        (task) =>
          Boolean(
            task.completed
          )
      ).length;


    const percentage =
      totalTasks === 0
        ? 0
        : Math.min(
            100,
            Math.round(
              (
                completedTasks /
                totalTasks
              ) * 100
            )
          );


    return {

      completedTasks,

      totalTasks,

      percentage,

    };

  } catch (error) {

    console.error(
      "Dashboard planner error:",
      error
    );


    return {

      completedTasks: 0,

      totalTasks: 0,

      percentage: 0,

    };

  }

}