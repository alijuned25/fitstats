import { useEffect, useState } from "react";

import workoutPlans from "./workoutData";
import ExerciseCard from "./ExerciseCard";

import {
  getWorkoutProgress,
  saveWorkoutProgress,
} from "./workoutUtils";


function WorkoutSplit({
  selectedSplit,
}) {

  /*
   * ==========================================
   * GET WORKOUT PLAN
   * ==========================================
   */

  const plan =
    workoutPlans[selectedSplit] || [];


  /*
   * ==========================================
   * LOAD SAVED WORKOUT DATA
   * ==========================================
   */

  const savedProgress =
    getWorkoutProgress();


  /*
   * ==========================================
   * WORKOUT STATE
   * ==========================================
   */

  const [
    completedExercises,
    setCompletedExercises,
  ] = useState(
    savedProgress.completedExercises
  );


  const [
    completedDays,
    setCompletedDays,
  ] = useState(
    savedProgress.completedDays
  );


  const [
    exerciseWeights,
    setExerciseWeights,
  ] = useState(
    savedProgress.exerciseWeights
  );


  /*
   * ==========================================
   * SAVE SELECTED SPLIT
   * ==========================================
   */

  useEffect(() => {

    const currentProgress =
      getWorkoutProgress();


    saveWorkoutProgress({
      ...currentProgress,

      selectedSplit,
    });

  }, [selectedSplit]);


  /*
   * ==========================================
   * CURRENT SPLIT DATA
   * ==========================================
   */

  const splitCompletedExercises =
    completedExercises[
      selectedSplit
    ] || [];


  const splitCompletedDays =
    completedDays[
      selectedSplit
    ] || [];


  /*
   * ==========================================
   * EXERCISE TOTALS
   * ==========================================
   */

  const totalExercises =
    plan.reduce(
      (total, day) =>
        total +
        day.exercises.length,
      0
    );


  const completedCount =
    splitCompletedExercises.length;


  const progress =
    totalExercises === 0
      ? 0
      : Math.round(
          (
            completedCount /
            totalExercises
          ) * 100
        );


  /*
   * ==========================================
   * COMPLETE EXERCISE
   * ==========================================
   */

  function handleComplete(
    exerciseName
  ) {

    setCompletedExercises(
      (previous) => {

        const currentExercises =
          previous[
            selectedSplit
          ] || [];


        /*
         * Prevent duplicate entries.
         */

        if (
          currentExercises.includes(
            exerciseName
          )
        ) {

          return previous;

        }


        const updatedExercises = [
          ...currentExercises,
          exerciseName,
        ];


        const updatedState = {

          ...previous,

          [selectedSplit]:
            updatedExercises,

        };


        /*
         * Save the complete workout
         * state to localStorage.
         */

        const currentProgress =
          getWorkoutProgress();


        saveWorkoutProgress({

          ...currentProgress,

          completedExercises:
            updatedState,

          completedDays:
            completedDays,

          exerciseWeights:
            exerciseWeights,

          selectedSplit:
            selectedSplit,

        });


        return updatedState;

      }
    );

  }


  /*
   * ==========================================
   * CHANGE EXERCISE WEIGHT
   * ==========================================
   */

  function handleWeightChange(
    exerciseName,
    weight
  ) {

    setExerciseWeights(
      (previous) => {

        const updatedState = {

          ...previous,

          [selectedSplit]: {

            ...(previous[
              selectedSplit
            ] || {}),

            [exerciseName]:
              weight,

          },

        };


        const currentProgress =
          getWorkoutProgress();


        saveWorkoutProgress({

          ...currentProgress,

          completedExercises:
            completedExercises,

          completedDays:
            completedDays,

          exerciseWeights:
            updatedState,

          selectedSplit:
            selectedSplit,

        });


        return updatedState;

      }
    );

  }


  /*
   * ==========================================
   * COMPLETE WORKOUT DAY
   * ==========================================
   */

  function handleCompleteDay(
    dayNumber
  ) {

    setCompletedDays(
      (previous) => {

        const currentDays =
          previous[
            selectedSplit
          ] || [];


        /*
         * Prevent duplicate days.
         */

        if (
          currentDays.includes(
            dayNumber
          )
        ) {

          return previous;

        }


        const updatedDays = [
          ...currentDays,
          dayNumber,
        ];


        const updatedState = {

          ...previous,

          [selectedSplit]:
            updatedDays,

        };


        const currentProgress =
          getWorkoutProgress();


        saveWorkoutProgress({

          ...currentProgress,

          completedExercises:
            completedExercises,

          completedDays:
            updatedState,

          exerciseWeights:
            exerciseWeights,

          selectedSplit:
            selectedSplit,

        });


        return updatedState;

      }
    );

  }


  /*
   * ==========================================
   * RESET CURRENT WORKOUT
   * ==========================================
   */

  function handleResetWorkout() {

    const updatedExercises = {

      ...completedExercises,

      [selectedSplit]: [],

    };


    const updatedDays = {

      ...completedDays,

      [selectedSplit]: [],

    };


    const updatedWeights = {

      ...exerciseWeights,

      [selectedSplit]: {},

    };


    setCompletedExercises(
      updatedExercises
    );


    setCompletedDays(
      updatedDays
    );


    setExerciseWeights(
      updatedWeights
    );


    const currentProgress =
      getWorkoutProgress();


    saveWorkoutProgress({

      ...currentProgress,

      selectedSplit:
        selectedSplit,

      completedExercises:
        updatedExercises,

      completedDays:
        updatedDays,

      exerciseWeights:
        updatedWeights,

    });

  }


  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (

    <section className="workout-plan">


      {/* =========================
          WORKOUT HEADER
      ========================= */}

      <div className="workout-header">

        <h2>
          {selectedSplit} Day Workout Plan
        </h2>


        <p>
          Your weekly workout schedule
        </p>

      </div>


      {/* =========================
          PROGRESS
      ========================= */}

      <div className="progress-container">

        <div className="progress-header">

          <span>
            Workout Progress
          </span>


          <span>
            {completedCount}
            {" / "}
            {totalExercises}
          </span>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          ></div>

        </div>


        <p>
          {progress}% completed
        </p>

      </div>


      {/* =========================
          RESET WORKOUT
      ========================= */}

      <button
        type="button"
        className="reset-workout-button"
        onClick={
          handleResetWorkout
        }
      >
        Reset This Workout
      </button>


      {/* =========================
          WORKOUT DAYS
      ========================= */}

      {plan.map(
        (day) => (

          <div
            className="workout-day"
            key={day.day}
          >


            {/* =========================
                DAY HEADER
            ========================= */}

            <div className="day-header">

              <div>

                <span>
                  DAY {day.day}
                </span>


                <h3>
                  {day.name}
                </h3>


                <p>
                  {day.muscles}
                </p>

              </div>

            </div>


            {/* =========================
                EXERCISES
            ========================= */}

            <div className="exercise-list">

              {day.exercises.map(
                (exercise) => (

                  <ExerciseCard
                    key={exercise.name}

                    exercise={
                      exercise
                    }

                    isCompleted={
                      splitCompletedExercises.includes(
                        exercise.name
                      )
                    }

                    weight={
                      exerciseWeights[
                        selectedSplit
                      ]?.[
                        exercise.name
                      ] || ""
                    }

                    onWeightChange={
                      (weight) =>
                        handleWeightChange(
                          exercise.name,
                          weight
                        )
                    }

                    onComplete={
                      () =>
                        handleComplete(
                          exercise.name
                        )
                    }
                  />

                )
              )}

            </div>


            {/* =========================
                COMPLETE DAY
            ========================= */}

            <div className="day-completion">

              <button
                type="button"
                className="day-complete-button"

                onClick={() =>
                  handleCompleteDay(
                    day.day
                  )
                }

                disabled={
                  splitCompletedDays.includes(
                    day.day
                  )
                }
              >

                {
                  splitCompletedDays.includes(
                    day.day
                  )
                    ? "✓ Day Completed"
                    : "Complete Day"
                }

              </button>

            </div>


          </div>

        )
      )}


    </section>

  );

}


export default WorkoutSplit;