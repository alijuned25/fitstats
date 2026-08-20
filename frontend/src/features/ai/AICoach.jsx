import { useState } from "react";
import ReactMarkdown from "react-markdown";

import dietData from "../diet/dietData";
import workoutPlans from "../workout/workoutData";


function AICoach() {

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  /* =========================================================
     GET CALCULATOR DATA
     ========================================================= */

  function getCalculatorData() {

    const savedData =
      localStorage.getItem(
        "fitstatsCalculatorResults"
      );

    if (!savedData) {
      return null;
    }

    try {
      return JSON.parse(savedData);
    } catch {
      return null;
    }
  }


  /* =========================================================
     GET CALORIE TARGET
     ========================================================= */

  function getCalorieTarget() {

    const savedCalories =
      localStorage.getItem(
        "fitstatsCalorieTarget"
      );

    if (!savedCalories) {
      return null;
    }

    const calories =
      Number(savedCalories);

    if (
      Number.isFinite(calories) &&
      calories > 0
    ) {
      return calories;
    }

    return null;
  }


  /* =========================================================
     GET DIET PREFERENCE
     ========================================================= */

  function getDietPreference() {

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


  /* =========================================================
     GET TODAY'S DATE
     ========================================================= */

  function getTodayDateString() {
    return new Date().toDateString();
  }


  /* =========================================================
     GET COMPLETED MEALS
     ========================================================= */

  function getCompletedMeals(
    targetCalories,
    dietType
  ) {

    if (!targetCalories) {
      return {
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false,
      };
    }

    const storageKey =
      `fitstatsCompletedMeals_${targetCalories}_${dietType}_${getTodayDateString()}`;

    const savedMeals =
      localStorage.getItem(
        storageKey
      );

    if (!savedMeals) {
      return {
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false,
      };
    }

    try {
      return JSON.parse(savedMeals);
    } catch {
      return {
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false,
      };
    }
  }


  /* =========================================================
     GET TODAY'S SELECTED MEALS
     ========================================================= */

  function getTodayMeals(
    targetCalories,
    dietType
  ) {

    if (!targetCalories) {
      return [];
    }

    const storageKey =
      `fitstatsMealSelections_${targetCalories}_${dietType}`;

    const savedSelections =
      localStorage.getItem(
        storageKey
      );

    let selectedIndexes = {
      breakfast: 0,
      lunch: 0,
      snack: 0,
      dinner: 0,
    };

    if (savedSelections) {

      try {
        selectedIndexes =
          JSON.parse(
            savedSelections
          );
      } catch {
        selectedIndexes = {
          breakfast: 0,
          lunch: 0,
          snack: 0,
          dinner: 0,
        };
      }
    }

    const diet =
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
          diet[section.key] || [];

        const selectedIndex =
          selectedIndexes[
            section.key
          ] ?? 0;

        const meal =
          availableMeals[
            selectedIndex
          ];

        return {
          mealType:
            section.key,

          targetCalories:
            Math.round(
              targetCalories *
              section.percentage
            ),

          meal: meal
            ? {
                name: meal.name,
                calories: meal.calories,
                protein: meal.protein,
                carbs: meal.carbs,
                fat: meal.fat,
                preparationTime:
                  meal.preparationTime,
              }
            : null,
        };
      }
    );
  }


  /* =========================================================
     GET WORKOUT DATA
     ========================================================= */

  function getWorkoutData() {

    const savedProgress =
      localStorage.getItem(
        "fitstatsWorkoutProgress"
      );

    const defaultProgress = {

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

    let progress =
      defaultProgress;

    if (savedProgress) {

      try {

        const parsed =
          JSON.parse(
            savedProgress
          );

        progress = {
          ...defaultProgress,
          ...parsed,

          completedExercises: {
            ...defaultProgress.completedExercises,
            ...(parsed.completedExercises || {}),
          },

          completedDays: {
            ...defaultProgress.completedDays,
            ...(parsed.completedDays || {}),
          },

          exerciseWeights: {
            ...defaultProgress.exerciseWeights,
            ...(parsed.exerciseWeights || {}),
          },
        };

      } catch {
        progress =
          defaultProgress;
      }
    }

    const selectedSplit =
      Number(
        progress.selectedSplit
      ) || 3;

    const workoutPlan =
      workoutPlans[
        selectedSplit
      ] || [];

    const completedExercises =
      progress.completedExercises?.[
        selectedSplit
      ] || [];

    const completedDays =
      progress.completedDays?.[
        selectedSplit
      ] || [];

    const weights =
      progress.exerciseWeights?.[
        selectedSplit
      ] || {};

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
            (
              completedExerciseCount /
              totalExercises
            ) * 100
          );

    const dayPercentage =
      totalDays === 0
        ? 0
        : Math.round(
            (
              completedDayCount /
              totalDays
            ) * 100
          );

    const days =
      workoutPlan.map(
        (day) => {

          const exercises =
            day.exercises.map(
              (exercise) => {

                const completed =
                  completedExercises.includes(
                    exercise.name
                  );

                return {
                  name:
                    exercise.name,

                  sets:
                    exercise.sets,

                  reps:
                    exercise.reps,

                  rest:
                    exercise.rest,

                  completed,

                  weight:
                    weights[
                      exercise.name
                    ] || "",
                };
              }
            );

          return {
            day: day.day,
            name: day.name,
            muscles: day.muscles,

            completed:
              completedDays.includes(
                day.day
              ),

            exercises,
          };
        }
      );

    const remainingExercises =
      days.flatMap(
        (day) =>
          day.exercises
            .filter(
              (exercise) =>
                !exercise.completed
            )
            .map(
              (exercise) => ({
                day: day.day,
                dayName: day.name,
                muscles: day.muscles,

                name:
                  exercise.name,

                sets:
                  exercise.sets,

                reps:
                  exercise.reps,

                rest:
                  exercise.rest,

                weight:
                  exercise.weight,
              })
            )
      );

    const completedExerciseDetails =
      days.flatMap(
        (day) =>
          day.exercises
            .filter(
              (exercise) =>
                exercise.completed
            )
            .map(
              (exercise) => ({
                day: day.day,
                dayName: day.name,
                muscles: day.muscles,

                name:
                  exercise.name,

                sets:
                  exercise.sets,

                reps:
                  exercise.reps,

                rest:
                  exercise.rest,

                weight:
                  exercise.weight,
              })
            )
      );

    return {
      selectedSplit,

      totalExercises,

      completedExerciseCount,

      exercisePercentage,

      totalDays,

      completedDayCount,

      dayPercentage,

      completedExercises,

      completedDays,

      weights,

      days,

      remainingExercises,

      completedExerciseDetails,
    };
  }


  /* =========================================================
     GET TODAY'S PLANNER DATA
     ========================================================= */

  function getPlannerData() {

    const savedTasks =
      localStorage.getItem(
        "fitstatsPlannerTasks"
      );

    let allTasks = {};

    if (savedTasks) {

      try {
        allTasks =
          JSON.parse(
            savedTasks
          );
      } catch {
        allTasks = {};
      }
    }

    const today =
      new Date();

    const dateKey =
      `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;

    const todayTasks =
      allTasks[
        dateKey
      ] || [];

    const totalTasks =
      todayTasks.length;

    const completedTasks =
      todayTasks.filter(
        (task) =>
          task.completed
      ).length;

    const percentage =
      totalTasks === 0
        ? 0
        : Math.round(
            (
              completedTasks /
              totalTasks
            ) * 100
          );

    return {

      date:
        dateKey,

      tasks:
        todayTasks.map(
          (task) => ({
            title:
              task.title,

            category:
              task.category,

            completed:
              task.completed,
          })
        ),

      totalTasks,

      completedTasks,

      percentage,
    };
  }


  /* =========================================================
     BUILD COMPLETE FITSTATS CONTEXT
     ========================================================= */

  function getFitnessData() {

    const calculator =
      getCalculatorData();

    const calorieTarget =
      getCalorieTarget();

    const dietPreference =
      getDietPreference();

    const completedMeals =
      getCompletedMeals(
        calorieTarget,
        dietPreference
      );

    const meals =
      getTodayMeals(
        calorieTarget,
        dietPreference
      );

    const workout =
      getWorkoutData();

    const planner =
      getPlannerData();

    return {

      calculator,

      calorieTarget,

      dietPreference,

      nutrition: {
        completedMeals,
        meals,
      },

      workout,

      planner,
    };
  }


  /* =========================================================
     SEND MESSAGE TO SENSEI
     ========================================================= */

  async function handleSendMessage() {

    const trimmedMessage =
      input.trim();

    if (
      !trimmedMessage ||
      isLoading
    ) {
      return;
    }

    const userMessage = {
      id:
        Date.now(),

      role:
        "user",

      text:
        trimmedMessage,
    };

    setMessages(
      (previous) => [
        ...previous,
        userMessage,
      ]
    );

    setInput("");

    setError("");

    setIsLoading(true);

    try {

      const controller =
        new AbortController();

      const timeoutId =
        setTimeout(
          () =>
            controller.abort(),
          30000
        );

      const response =
        await fetch(
          "http://localhost:5000/api/ai/chat",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  trimmedMessage,

                fitnessData:
                  getFitnessData(),
              }),

            signal:
              controller.signal,
          }
        );

      clearTimeout(
        timeoutId
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data?.message ||
          `Sensei request failed with status ${response.status}.`
        );
      }

      const senseiMessage = {
        id:
          Date.now() + 1,

        role:
          "assistant",

        text:
          data.reply ||
          "Sensei couldn't generate a response.",
      };

      setMessages(
        (previous) => [
          ...previous,
          senseiMessage,
        ]
      );

    } catch (requestError) {

      console.error(
        "Sensei error:",
        requestError
      );

      if (
        requestError?.name ===
        "AbortError"
      ) {

        setError(
          "Sensei took too long to respond. Please try again."
        );

      } else {

        setError(
          requestError?.message ||
          "Unable to connect to Sensei."
        );
      }

    } finally {

      setIsLoading(false);

    }
  }


  /* =========================================================
     KEYBOARD HANDLING
     ========================================================= */

  function handleKeyDown(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      handleSendMessage();
    }
  }


  /* =========================================================
     CLEAR CHAT
     ========================================================= */

  function handleClearChat() {

    setMessages([]);

    setError("");
  }


  /* =========================================================
     SUGGESTIONS
     ========================================================= */

  function handleSuggestion(
    suggestion
  ) {

    setInput(
      suggestion
    );
  }


  /* =========================================================
     RENDER
     ========================================================= */

  return (

    <main className="ai-page">

      <header className="ai-page-header">

        <div>

          <span className="ai-eyebrow">
            FITSTATS SENSEI
          </span>

          <h1>
            Sensei
          </h1>

          <p>
            Your personal AI fitness mentor
            for workouts, nutrition and
            daily progress.
          </p>

        </div>

        {messages.length > 0 && (

          <button
            type="button"
            className="ai-clear-button"
            onClick={
              handleClearChat
            }
          >
            Clear Chat
          </button>

        )}

      </header>


      <section className="ai-chat-card">

        {messages.length === 0 ? (

          <div className="ai-empty-state">

            <div className="ai-empty-icon">
              ✦
            </div>

            <span className="ai-empty-eyebrow">
              FITSTATS SENSEI
            </span>

            <h2>
              How can Sensei help you today?
            </h2>

            <p>
              Ask about your workouts,
              nutrition, calories,
              recovery or fitness progress.
            </p>

            <div className="ai-suggestion-grid">

              <button
                type="button"
                onClick={() =>
                  handleSuggestion(
                    "Suggest me a workout based on my current workout progress."
                  )
                }
              >
                🏋️ Suggest a workout
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSuggestion(
                    "What should I eat today based on my calorie target and selected meals?"
                  )
                }
              >
                🥗 Nutrition advice
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSuggestion(
                    "Analyze my current fitness progress."
                  )
                }
              >
                📈 Analyze my progress
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSuggestion(
                    "How many calories should I have left today?"
                  )
                }
              >
                🔥 Calorie guidance
              </button>

            </div>

          </div>

        ) : (

          <div className="ai-message-list">

            {messages.map(
              (message) => (

                <div
                  key={
                    message.id
                  }

                  className={
                    message.role === "user"
                      ? "ai-message user"
                      : "ai-message assistant"
                  }
                >

                  <div className="ai-message-avatar">

                    {message.role === "user"
                      ? "You"
                      : "✦"}

                  </div>

                  <div className="ai-message-bubble">

                    {message.role === "assistant" ? (

                      <ReactMarkdown>
                        {message.text}
                      </ReactMarkdown>

                    ) : (

                      message.text

                    )}

                  </div>

                </div>

              )
            )}

            {isLoading && (

              <div
                className="ai-message assistant"
              >

                <div
                  className="ai-message-avatar"
                >
                  ✦
                </div>

                <div
                  className="ai-message-bubble"
                >
                  Sensei is thinking...
                </div>

              </div>

            )}

          </div>

        )}


        {error && (

          <div
            className="ai-error-message"
          >
            {error}
          </div>

        )}


        <div className="ai-input-area">

          <textarea
            value={
              input
            }

            onChange={
              (event) =>
                setInput(
                  event.target.value
                )
            }

            onKeyDown={
              handleKeyDown
            }

            placeholder={
              isLoading
                ? "Sensei is thinking..."
                : "Ask Sensei anything about your fitness..."
            }

            rows="1"

            disabled={
              isLoading
            }
          />

          <button
            type="button"
            className="ai-send-button"
            onClick={
              handleSendMessage
            }

            disabled={
              isLoading ||
              !input.trim()
            }
          >

            {isLoading
              ? "..."
              : "Send"}

          </button>

        </div>

      </section>

    </main>
  );
}


export default AICoach;