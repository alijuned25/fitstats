// ================================
// BMI CALCULATION
// ================================

export function calculateBMI(weight, height) {
  if (
    !weight ||
    !height ||
    weight <= 0 ||
    height <= 0
  ) {
    return 0;
  }

  const heightInMeters = height / 100;

  const bmi =
    weight /
    (heightInMeters * heightInMeters);

  return Number(bmi.toFixed(1));
}


// ================================
// BMI CATEGORY
// ================================

export function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
}


// ================================
// BMR CALCULATION
// Mifflin-St Jeor Equation
// ================================

export function calculateBMR(
  gender,
  weight,
  height,
  age
) {
  if (
    !weight ||
    !height ||
    !age
  ) {
    return 0;
  }

  let bmr;

  if (gender === "male") {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age +
      5;
  } else {
    bmr =
      10 * weight +
      6.25 * height -
      5 * age -
      161;
  }

  return Math.round(bmr);
}


// ================================
// ACTIVITY LEVELS
// ================================

export const activityLevels = [
  {
    value: "sedentary",
    label: "Sedentary",
    description:
      "Little or no exercise",
    multiplier: 1.2,
  },

  {
    value: "light",
    label: "Lightly Active",
    description:
      "Exercise 1–3 days/week",
    multiplier: 1.375,
  },

  {
    value: "moderate",
    label: "Moderately Active",
    description:
      "Exercise 3–5 days/week",
    multiplier: 1.55,
  },

  {
    value: "very",
    label: "Very Active",
    description:
      "Exercise 6–7 days/week",
    multiplier: 1.725,
  },

  {
    value: "extra",
    label: "Extra Active",
    description:
      "Hard training / physical job",
    multiplier: 1.9,
  },
];


// ================================
// TDEE CALCULATION
// ================================

export function calculateTDEE(
  bmr,
  activityLevel
) {
  const activity =
    activityLevels.find(
      (item) =>
        item.value === activityLevel
    );

  if (!activity || !bmr) {
    return 0;
  }

  return Math.round(
    bmr * activity.multiplier
  );
}


// ================================
// GOAL CALORIES
// ================================

export function calculateGoalCalories(
  tdee,
  goal
) {
  if (!tdee) {
    return 0;
  }

  // Weight loss
  if (goal === "lose") {
    return Math.round(
      tdee - 500
    );
  }

  // Weight gain
  if (goal === "gain") {
    return Math.round(
      tdee + 300
    );
  }

  // Maintain weight
  return tdee;
}