import { useEffect, useState } from "react";

import {
  calculateMealTotals,
  calculateConsumedNutrition,
  calculateRemainingCalories,
  calculateMealCompletion,
  calculateProteinTarget,
  calculateCarbTarget,
  calculateFatTarget,
  calculateNutritionPercentage,
} from "./nutritionUtils";

function MealPlan({
  meals,
  targetCalories,
}) {
  const mealSections = [
    {
      key: "breakfast",
      title: "Breakfast",
      icon: "🌅",
      percentage: 0.25,
    },
    {
      key: "lunch",
      title: "Lunch",
      icon: "☀️",
      percentage: 0.35,
    },
    {
      key: "snack",
      title: "Snack",
      icon: "🍎",
      percentage: 0.15,
    },
    {
      key: "dinner",
      title: "Dinner",
      icon: "🌙",
      percentage: 0.25,
    },
  ];

  const [selectedMealIndexes, setSelectedMealIndexes] =
    useState({
      breakfast: 0,
      lunch: 0,
      snack: 0,
      dinner: 0,
    });

  const [completedMeals, setCompletedMeals] =
    useState({
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
    });

  function findClosestMeal(
    availableMeals,
    targetMealCalories
  ) {
    if (!availableMeals.length) {
      return 0;
    }

    let bestIndex = 0;

    let smallestDifference =
      Math.abs(
        availableMeals[0].calories -
          targetMealCalories
      );

    for (
      let i = 1;
      i < availableMeals.length;
      i++
    ) {
      const difference =
        Math.abs(
          availableMeals[i].calories -
            targetMealCalories
        );

      if (difference < smallestDifference) {
        smallestDifference = difference;
        bestIndex = i;
      }
    }

    return bestIndex;
  }

  function getDietType(mealData) {
    const firstBreakfast =
      mealData?.breakfast?.[0];

    if (
      firstBreakfast?.id?.startsWith(
        "nonveg-"
      )
    ) {
      return "nonVegetarian";
    }

    return "vegetarian";
  }

  const dietType = getDietType(meals);

  const mealStorageKey =
    `fitstatsMealSelections_${targetCalories}_${dietType}`;

  const today = new Date();

  const todayDateString =
    today.toDateString();

  const completedStorageKey =
    `fitstatsCompletedMeals_${targetCalories}_${dietType}_${todayDateString}`;

  /*
   * Load saved meal selections.
   */

  useEffect(() => {
    const savedSelections =
      localStorage.getItem(
        mealStorageKey
      );

    if (savedSelections) {
      try {
        setSelectedMealIndexes(
          JSON.parse(savedSelections)
        );

        return;
      } catch {
        localStorage.removeItem(
          mealStorageKey
        );
      }
    }

    const initialSelections = {};

    mealSections.forEach(
      (section) => {
        const availableMeals =
          meals[section.key] || [];

        const targetMealCalories =
          targetCalories *
          section.percentage;

        initialSelections[section.key] =
          findClosestMeal(
            availableMeals,
            targetMealCalories
          );
      }
    );

    setSelectedMealIndexes(
      initialSelections
    );
  }, [
    meals,
    targetCalories,
    mealStorageKey,
  ]);

  /*
   * Save selected meals.
   */

  useEffect(() => {
    localStorage.setItem(
      mealStorageKey,
      JSON.stringify(
        selectedMealIndexes
      )
    );
  }, [
    selectedMealIndexes,
    mealStorageKey,
  ]);

  /*
   * Load today's completed meals.
   */

  useEffect(() => {
    const savedCompletedMeals =
      localStorage.getItem(
        completedStorageKey
      );

    if (savedCompletedMeals) {
      try {
        setCompletedMeals(
          JSON.parse(
            savedCompletedMeals
          )
        );
      } catch {
        localStorage.removeItem(
          completedStorageKey
        );
      }
    } else {
      setCompletedMeals({
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false,
      });
    }
  }, [
    completedStorageKey,
  ]);

  /*
   * Save today's completed meals.
   */

  useEffect(() => {
    localStorage.setItem(
      completedStorageKey,
      JSON.stringify(
        completedMeals
      )
    );
  }, [
    completedMeals,
    completedStorageKey,
  ]);

  /*
   * Change meal.
   */

  function handleChangeMeal(mealKey) {
    const availableMeals =
      meals[mealKey] || [];

    if (availableMeals.length <= 1) {
      return;
    }

    setSelectedMealIndexes(
      (previous) => {
        const currentIndex =
          previous[mealKey] ?? 0;

        const nextIndex =
          (currentIndex + 1) %
          availableMeals.length;

        return {
          ...previous,
          [mealKey]: nextIndex,
        };
      }
    );

    /*
     * A newly selected meal has
     * not been eaten yet.
     */

    setCompletedMeals(
      (previous) => ({
        ...previous,
        [mealKey]: false,
      })
    );
  }

  /*
   * Mark meal as eaten / undo.
   */

  function handleToggleMeal(mealKey) {
    setCompletedMeals(
      (previous) => ({
        ...previous,
        [mealKey]:
          !previous[mealKey],
      })
    );
  }

  /*
   * Reset only today's tracking.
   */

  function handleResetToday() {
    const resetMeals = {
      breakfast: false,
      lunch: false,
      snack: false,
      dinner: false,
    };

    setCompletedMeals(
      resetMeals
    );

    localStorage.setItem(
      completedStorageKey,
      JSON.stringify(
        resetMeals
      )
    );
  }

  /*
   * Selected meals.
   */

  const selectedMeals =
    mealSections.map((section) => {
      const availableMeals =
        meals[section.key] || [];

      const selectedIndex =
        selectedMealIndexes[
          section.key
        ] ?? 0;

      const meal =
        availableMeals[selectedIndex];

      const targetMealCalories =
        targetCalories *
        section.percentage;

      const mealDifference =
        meal
          ? meal.calories -
            targetMealCalories
          : 0;

      return {
        ...section,
        meal,
        targetMealCalories,
        mealDifference,
      };
    });

  /*
   * Planned nutrition.
   */

  const plannedNutrition =
    calculateMealTotals(
      selectedMeals
    );

  const totalCalories =
    plannedNutrition.calories;

  const totalProtein =
    plannedNutrition.protein;

  const totalCarbs =
    plannedNutrition.carbs;

  const totalFat =
    plannedNutrition.fat;

  /*
   * Consumed nutrition.
   */

  const consumedNutrition =
    calculateConsumedNutrition(
      selectedMeals,
      completedMeals
    );

  const consumedCalories =
    consumedNutrition.calories;

  const consumedProtein =
    consumedNutrition.protein;

  const consumedCarbs =
    consumedNutrition.carbs;

  const consumedFat =
    consumedNutrition.fat;

  const completedCount =
    consumedNutrition.completedCount;

  const remainingCalories =
    calculateRemainingCalories(
      targetCalories,
      consumedCalories
    );

  const completionPercentage =
    calculateMealCompletion(
      completedCount,
      mealSections.length
    );

  /*
   * Nutrition percentages.
   */

  const caloriePercentage =
    calculateNutritionPercentage(
      consumedCalories,
      targetCalories
    );

  const proteinTarget =
    calculateProteinTarget(
      targetCalories
    );

  const carbTarget =
    calculateCarbTarget(
      targetCalories
    );

  const fatTarget =
    calculateFatTarget(
      targetCalories
    );

  const proteinPercentage =
    calculateNutritionPercentage(
      consumedProtein,
      proteinTarget
    );

  const carbPercentage =
    calculateNutritionPercentage(
      consumedCarbs,
      carbTarget
    );

  const fatPercentage =
    calculateNutritionPercentage(
      consumedFat,
      fatTarget
    );

  return (
    <section className="meal-plan">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="meal-plan-header">

        <div>

          <span className="diet-eyebrow">
            TODAY'S PLAN
          </span>

          <h2>
            Your Daily Meal Plan
          </h2>

          <p>
            Meals are automatically selected
            according to your calorie target.
          </p>

        </div>

        <div className="meal-target">

          <span>
            Daily Target
          </span>

          <strong>
            {targetCalories.toLocaleString()}
          </strong>

          <small>
            kcal
          </small>

        </div>

      </div>


      {/* =================================================
          DATE + RESET
      ================================================= */}

      <div className="meal-day-controls">

        <div className="meal-today">

          <span>
            TODAY
          </span>

          <strong>
            {today.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
              }
            )}
          </strong>

        </div>

        <button
          type="button"
          className="reset-diet-button"
          onClick={
            handleResetToday
          }
        >
          Reset Today's Tracking
        </button>

      </div>


      {/* =================================================
          DAILY TRACKING
      ================================================= */}

      <div className="nutrition-tracker">

        <div className="nutrition-tracker-header">

          <div>

            <span>
              TODAY'S PROGRESS
            </span>

            <strong>
              {completedCount} /{" "}
              {mealSections.length} meals
            </strong>

          </div>

          <strong>
            {completionPercentage}%
          </strong>

        </div>

        <div className="nutrition-progress-bar">

          <div
            className="nutrition-progress-fill"
            style={{
              width:
                `${completionPercentage}%`,
            }}
          ></div>

        </div>

        <div className="nutrition-tracker-stats">

          <div>

            <span>
              Consumed
            </span>

            <strong>
              {consumedCalories.toLocaleString()}
              {" "}kcal
            </strong>

          </div>

          <div>

            <span>
              Remaining
            </span>

            <strong>
              {remainingCalories.toLocaleString()}
              {" "}kcal
            </strong>

          </div>

          <div>

            <span>
              Protein
            </span>

            <strong>
              {consumedProtein}g
            </strong>

          </div>

          <div>

            <span>
              Carbs
            </span>

            <strong>
              {consumedCarbs}g
            </strong>

          </div>

          <div>

            <span>
              Fat
            </span>

            <strong>
              {consumedFat}g
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          NUTRITION OVERVIEW
      ================================================= */}

      <div className="nutrition-overview">

        <div className="nutrition-overview-header">

          <div>

            <span className="nutrition-overview-eyebrow">
              TODAY'S NUTRITION
            </span>

            <h3>
              Your Nutrition Progress
            </h3>

          </div>

        </div>


        {/* Calories */}

        <div className="nutrition-progress-item">

          <div className="nutrition-progress-info">

            <div>

              <span>
                Calories
              </span>

              <strong>
                {consumedCalories.toLocaleString()}
                {" "} / {" "}
                {targetCalories.toLocaleString()}
                {" "}kcal
              </strong>

            </div>

            <span>
              {caloriePercentage}%
            </span>

          </div>

          <div className="nutrition-bar">

            <div
              className="nutrition-bar-fill"
              style={{
                width:
                  `${caloriePercentage}%`,
              }}
            ></div>

          </div>

        </div>


        {/* Protein */}

        <div className="nutrition-progress-item">

          <div className="nutrition-progress-info">

            <div>

              <span>
                Protein
              </span>

              <strong>
                {consumedProtein}g
              </strong>

            </div>

            <span>
              {proteinPercentage}%
            </span>

          </div>

          <div className="nutrition-bar">

            <div
              className="nutrition-bar-fill"
              style={{
                width:
                  `${proteinPercentage}%`,
              }}
            ></div>

          </div>

        </div>


        {/* Carbs */}

        <div className="nutrition-progress-item">

          <div className="nutrition-progress-info">

            <div>

              <span>
                Carbohydrates
              </span>

              <strong>
                {consumedCarbs}g
              </strong>

            </div>

            <span>
              {carbPercentage}%
            </span>

          </div>

          <div className="nutrition-bar">

            <div
              className="nutrition-bar-fill"
              style={{
                width:
                  `${carbPercentage}%`,
              }}
            ></div>

          </div>

        </div>


        {/* Fat */}

        <div className="nutrition-progress-item">

          <div className="nutrition-progress-info">

            <div>

              <span>
                Fat
              </span>

              <strong>
                {consumedFat}g
              </strong>

            </div>

            <span>
              {fatPercentage}%
            </span>

          </div>

          <div className="nutrition-bar">

            <div
              className="nutrition-bar-fill"
              style={{
                width:
                  `${fatPercentage}%`,
              }}
            ></div>

          </div>

        </div>

      </div>


      {/* =================================================
          CALORIE STATUS
      ================================================= */}

      <div
        className={
          remainingCalories > 0
            ? "meal-calorie-status"
            : "meal-calorie-status over"
        }
      >

        <span>
          {remainingCalories > 0
            ? "Calories remaining today"
            : "Daily calorie target reached"}
        </span>

        <strong>
          {remainingCalories.toLocaleString()}
          {" "}kcal
        </strong>

      </div>


      {/* =================================================
          MEALS
      ================================================= */}

      <div className="meal-list">

        {selectedMeals.map(
          (section) => (

            <article
              className={
                completedMeals[
                  section.key
                ]
                  ? "meal-card completed"
                  : "meal-card"
              }
              key={section.key}
            >

              <div className="meal-card-header">

                <span className="meal-icon">
                  {section.icon}
                </span>

                <div className="meal-card-title">

                  <span className="meal-type">
                    {section.title}
                  </span>

                  <h3>
                    {section.meal?.name ||
                      "No meal available"}
                  </h3>

                </div>

                {completedMeals[
                  section.key
                ] && (

                  <span className="meal-completed-badge">
                    ✓ Eaten
                  </span>

                )}

              </div>


              <div className="meal-nutrition">

                <div>

                  <strong>
                    {section.meal?.calories ||
                      0}
                  </strong>

                  <span>
                    kcal
                  </span>

                </div>

                <div>

                  <strong>
                    {section.meal?.protein ||
                      0}g
                  </strong>

                  <span>
                    protein
                  </span>

                </div>

                <div>

                  <strong>
                    {section.meal?.carbs ||
                      0}g
                  </strong>

                  <span>
                    carbs
                  </span>

                </div>

                <div>

                  <strong>
                    {section.meal?.fat ||
                      0}g
                  </strong>

                  <span>
                    fat
                  </span>

                </div>

              </div>


              <div className="meal-ingredients">

                <span>
                  Ingredients
                </span>

                <p>
                  {section.meal?.ingredients ||
                    "Ingredients not available."}
                </p>

              </div>


              <div className="meal-details">

                <span>
                  ⏱{" "}
                  {section.meal
                    ?.preparationTime || 0}
                  {" "}min
                </span>

                <span>
                  Meal target:{" "}
                  {Math.round(
                    section.targetMealCalories
                  )}
                  {" "}kcal
                </span>

              </div>


              {section.meal && (

                <div className="meal-match">

                  <span>
                    {section.mealDifference <= 0
                      ? "Below target"
                      : "Above target"}
                  </span>

                  <strong>
                    {Math.abs(
                      Math.round(
                        section.mealDifference
                      )
                    )}
                    {" "}kcal
                  </strong>

                </div>

              )}


              <div className="meal-actions">

                <button
                  type="button"
                  className={
                    completedMeals[
                      section.key
                    ]
                      ? "meal-eaten-button completed"
                      : "meal-eaten-button"
                  }
                  onClick={() =>
                    handleToggleMeal(
                      section.key
                    )
                  }
                >
                  {completedMeals[
                    section.key
                  ]
                    ? "✓ Meal Eaten"
                    : "Mark as Eaten"}
                </button>

                <button
                  type="button"
                  className="change-meal-button"
                  onClick={() =>
                    handleChangeMeal(
                      section.key
                    )
                  }
                  disabled={
                    !meals[
                      section.key
                    ] ||
                    meals[
                      section.key
                    ].length <= 1
                  }
                >
                  ↻ Change Meal
                </button>

              </div>

            </article>

          )
        )}

      </div>

    </section>
  );
}

export default MealPlan;