/*
 * =========================================================
 * FITSTATS WORKOUT UTILITIES
 * =========================================================
 *
 * Shared workout progress functions used by:
 *
 * - WorkoutSplit
 * - Dashboard
 *
 */


/*
 * =========================================================
 * STORAGE KEY
 * =========================================================
 */

const WORKOUT_STORAGE_KEY =
  "fitstatsWorkoutProgress";


/*
 * =========================================================
 * DEFAULT WORKOUT PROGRESS
 * =========================================================
 */

const defaultWorkoutProgress = {
  selectedSplit: 3,

  completedExercises: {
    3: [],
    4: [],
    5: [],
    6: [],
  },

  completedDays: {
    3: [],
    4: [],
    5: [],
    6: [],
  },

  exerciseWeights: {
    3: {},
    4: {},
    5: {},
    6: {},
  },
};


/*
 * =========================================================
 * GET WORKOUT PROGRESS
 * =========================================================
 */

export function getWorkoutProgress() {
  const savedProgress =
    localStorage.getItem(
      WORKOUT_STORAGE_KEY
    );

  if (!savedProgress) {
    return defaultWorkoutProgress;
  }

  try {
    const parsedProgress =
      JSON.parse(savedProgress);

    return {
      ...defaultWorkoutProgress,

      ...parsedProgress,

      completedExercises: {
        ...defaultWorkoutProgress.completedExercises,
        ...(parsedProgress.completedExercises || {}),
      },

      completedDays: {
        ...defaultWorkoutProgress.completedDays,
        ...(parsedProgress.completedDays || {}),
      },

      exerciseWeights: {
        ...defaultWorkoutProgress.exerciseWeights,
        ...(parsedProgress.exerciseWeights || {}),
      },
    };

  } catch {
    return defaultWorkoutProgress;
  }
}


/*
 * =========================================================
 * SAVE WORKOUT PROGRESS
 * =========================================================
 */

export function saveWorkoutProgress(
  progress
) {
  localStorage.setItem(
    WORKOUT_STORAGE_KEY,
    JSON.stringify(progress)
  );
}


/*
 * =========================================================
 * SAVE SELECTED SPLIT
 * =========================================================
 */

export function saveSelectedSplit(
  selectedSplit
) {
  const currentProgress =
    getWorkoutProgress();

  saveWorkoutProgress({
    ...currentProgress,

    selectedSplit,
  });
}


/*
 * =========================================================
 * GET SELECTED SPLIT
 * =========================================================
 */

export function getSelectedSplit() {
  const progress =
    getWorkoutProgress();

  return progress.selectedSplit || 3;
}


/*
 * =========================================================
 * GET SPLIT PROGRESS
 * =========================================================
 */

export function getSplitWorkoutProgress(
  selectedSplit,
  workoutPlan
) {
  const progress =
    getWorkoutProgress();


  const completedExercises =
    progress.completedExercises?.[
      selectedSplit
    ] || [];


  const completedDays =
    progress.completedDays?.[
      selectedSplit
    ] || [];


  const totalExercises =
    workoutPlan.reduce(
      (total, day) =>
        total +
        day.exercises.length,
      0
    );


  const completedExerciseCount =
    completedExercises.length;


  const totalDays =
    workoutPlan.length;


  const completedDayCount =
    completedDays.length;


  const exercisePercentage =
    totalExercises === 0
      ? 0
      : Math.round(
          (completedExerciseCount /
            totalExercises) *
            100
        );


  const dayPercentage =
    totalDays === 0
      ? 0
      : Math.round(
          (completedDayCount /
            totalDays) *
            100
        );


  return {
    completedExercises,

    completedExerciseCount,

    totalExercises,

    completedDays,

    completedDayCount,

    totalDays,

    exercisePercentage,

    dayPercentage,
  };
}