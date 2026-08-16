/*
 * =========================================================
 * FITSTATS NUTRITION UTILITIES
 * =========================================================
 *
 * Shared calculations used by:
 *
 * - Diet
 * - MealPlan
 * - Dashboard
 *
 * Keeping these calculations here prevents
 * different pages from calculating nutrition
 * differently.
 */


/*
 * =========================================================
 * MEAL TOTALS
 * ========================================================= */

export function calculateMealTotals(
  selectedMeals
) {
  return selectedMeals.reduce(
    (totals, section) => {

      const meal =
        section.meal;

      if (!meal) {
        return totals;
      }

      totals.calories +=
        Number(meal.calories) || 0;

      totals.protein +=
        Number(meal.protein) || 0;

      totals.carbs +=
        Number(meal.carbs) || 0;

      totals.fat +=
        Number(meal.fat) || 0;

      return totals;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );
}


/*
 * =========================================================
 * CONSUMED MEAL TOTALS
 * ========================================================= */

export function calculateConsumedNutrition(
  selectedMeals,
  completedMeals
) {
  const consumedMeals =
    selectedMeals.filter(
      (section) =>
        completedMeals[
          section.key
        ]
    );

  return {
    ...calculateMealTotals(
      consumedMeals
    ),

    completedCount:
      consumedMeals.length,
  };
}


/*
 * =========================================================
 * REMAINING CALORIES
 * ========================================================= */

export function calculateRemainingCalories(
  targetCalories,
  consumedCalories
) {
  return Math.max(
    Number(targetCalories) -
      Number(consumedCalories),
    0
  );
}


/*
 * =========================================================
 * MEAL COMPLETION
 * ========================================================= */

export function calculateMealCompletion(
  completedCount,
  totalMeals
) {
  if (!totalMeals) {
    return 0;
  }

  return Math.round(
    (completedCount /
      totalMeals) *
      100
  );
}


/*
 * =========================================================
 * MACRO TARGETS
 * =========================================================
 *
 * These targets use the same macro
 * assumptions currently used by the
 * Nutrition Overview in MealPlan:
 *
 * Protein      18% of calories
 * Carbohydrate 50% of calories
 * Fat          30% of calories
 */


/*
 * Protein target.
 */

export function calculateProteinTarget(
  targetCalories
) {
  return Math.max(
    (Number(targetCalories) *
      0.18) /
      4,
    1
  );
}


/*
 * Carbohydrate target.
 */

export function calculateCarbTarget(
  targetCalories
) {
  return Math.max(
    (Number(targetCalories) *
      0.50) /
      4,
    1
  );
}


/*
 * Fat target.
 */

export function calculateFatTarget(
  targetCalories
) {
  return Math.max(
    (Number(targetCalories) *
      0.30) /
      9,
    1
  );
}


/*
 * =========================================================
 * NUTRITION PERCENTAGES
 * ========================================================= */

export function calculateNutritionPercentage(
  consumed,
  target
) {
  if (!target || target <= 0) {
    return 0;
  }

  return Math.min(
    Math.round(
      (Number(consumed) /
        Number(target)) *
        100
    ),
    100
  );
}


/*
 * =========================================================
 * COMPLETE NUTRITION SUMMARY
 * ========================================================= */

export function calculateNutritionSummary(
  selectedMeals,
  completedMeals,
  targetCalories
) {
  const planned =
    calculateMealTotals(
      selectedMeals
    );


  const consumed =
    calculateConsumedNutrition(
      selectedMeals,
      completedMeals
    );


  const remainingCalories =
    calculateRemainingCalories(
      targetCalories,
      consumed.calories
    );


  const completionPercentage =
    calculateMealCompletion(
      consumed.completedCount,
      selectedMeals.length
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


  const caloriePercentage =
    calculateNutritionPercentage(
      consumed.calories,
      targetCalories
    );


  const proteinPercentage =
    calculateNutritionPercentage(
      consumed.protein,
      proteinTarget
    );


  const carbPercentage =
    calculateNutritionPercentage(
      consumed.carbs,
      carbTarget
    );


  const fatPercentage =
    calculateNutritionPercentage(
      consumed.fat,
      fatTarget
    );


  return {
    planned,

    consumed: {
      calories:
        consumed.calories,

      protein:
        consumed.protein,

      carbs:
        consumed.carbs,

      fat:
        consumed.fat,

      completedCount:
        consumed.completedCount,
    },

    remainingCalories,

    completionPercentage,

    targets: {
      calories:
        Number(targetCalories),

      protein:
        proteinTarget,

      carbs:
        carbTarget,

      fat:
        fatTarget,
    },

    percentages: {
      calories:
        caloriePercentage,

      protein:
        proteinPercentage,

      carbs:
        carbPercentage,

      fat:
        fatPercentage,
    },
  };
}