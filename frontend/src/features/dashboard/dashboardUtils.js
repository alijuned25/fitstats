import dietData from "../diet/dietData";

import {
  calculateNutritionSummary,
} from "../diet/nutritionUtils";

import workoutPlans from "../workout/workoutData";

import {
  getSelectedSplit,
  getSplitWorkoutProgress,
} from "../workout/workoutUtils";

import {
  getTodayPlannerProgress,
} from "../planner/plannerStorage";


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

  return new Date().toDateString();

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
    getTodayDateString();


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
 * GET TODAY'S WORKOUT PROGRESS
 * =========================================================
 */

export function getDashboardWorkout() {

  /*
   * Get the currently selected
   * workout split.
   */

  const selectedSplit =
    getSelectedSplit();


  /*
   * Get the workout plan for
   * that split.
   */

  const workoutPlan =
    workoutPlans[
      selectedSplit
    ] || [];


  /*
   * Get the saved workout
   * completion data.
   */

  const progress =
    getSplitWorkoutProgress(
      selectedSplit,
      workoutPlan
    );


  /*
   * Return a clean object
   * for the Dashboard.
   */

  return {

    selectedSplit,

    completedExercises:
      progress.completedExerciseCount,

    totalExercises:
      progress.totalExercises,

    exercisePercentage:
      progress.exercisePercentage,

    completedDays:
      progress.completedDayCount,

    totalDays:
      progress.totalDays,

    dayPercentage:
      progress.dayPercentage,

  };

}


/*
 * =========================================================
 * GET TODAY'S PLANNER PROGRESS
 * =========================================================
 */

export function getDashboardPlanner() {

  const progress =
    getTodayPlannerProgress();


  /*
   * Return a clean object
   * for the Dashboard.
   */

  return {

    completedTasks:
      progress.completedTasks,

    totalTasks:
      progress.totalTasks,

    percentage:
      progress.percentage,

  };

}