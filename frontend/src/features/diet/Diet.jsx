import { useState } from "react";

import DietPreference from "./DietPreference";
import MealPlan from "./MealPlan";
import dietData from "./dietData";


function Diet() {

  /*
   * ==========================================
   * LOAD CALCULATOR RESULTS
   * ==========================================
   */

  const savedCalculatorResults =
    localStorage.getItem(
      "fitstatsCalculatorResults"
    );


  let calculatorResults = null;


  try {

    calculatorResults =
      savedCalculatorResults
        ? JSON.parse(
            savedCalculatorResults
          )
        : null;

  } catch {

    calculatorResults = null;

  }


  /*
   * ==========================================
   * CALORIE TARGET
   * ==========================================
   */

  const savedCalories =
    localStorage.getItem(
      "fitstatsCalorieTarget"
    );


  let initialCalories = 2200;


  if (savedCalories) {

    const parsedCalories =
      Number(savedCalories);


    if (
      Number.isFinite(parsedCalories) &&
      parsedCalories > 0
    ) {

      initialCalories =
        parsedCalories;

    }

  } else if (
    calculatorResults?.goalCalories
  ) {

    const calculatorCalories =
      Number(
        calculatorResults.goalCalories
      );


    if (
      Number.isFinite(
        calculatorCalories
      ) &&
      calculatorCalories > 0
    ) {

      initialCalories =
        calculatorCalories;

    }

  }


  const [
    targetCalories,
    setTargetCalories,
  ] = useState(
    initialCalories
  );


  /*
   * ==========================================
   * DIET PREFERENCE
   * ==========================================
   */

  const savedPreference =
    localStorage.getItem(
      "fitstatsDietPreference"
    );


  const initialPreference =
    savedPreference ===
      "nonVegetarian"
      ? "nonVegetarian"
      : "vegetarian";


  const [
    preference,
    setPreference,
  ] = useState(
    initialPreference
  );


  /*
   * ==========================================
   * FITNESS GOAL
   * ==========================================
   */

  const goal =
    calculatorResults?.goal ||
    "maintain";


  /*
   * ==========================================
   * SAVE DIET PREFERENCE TO MYSQL
   * ==========================================
   */

  async function saveDietPreferenceToDatabase(
    newPreference
  ) {

    try {

      /*
       * Authentication is not implemented yet,
       * so we use development user ID 1.
       */

      const userId =
        localStorage.getItem(
          "fitstatsUserId"
        ) || "1";


      /*
       * Convert frontend value into
       * database-friendly value.
       */

      const dietType =
        newPreference === "nonVegetarian"
          ? "Non-Vegetarian"
          : "Vegetarian";


      /*
       * Send preference to backend.
       */

      const response =
        await fetch(
          "http://localhost:5000/api/diet",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              user_id:
                Number(userId),

              diet_type:
                dietType,

              /*
               * These fields are not currently
               * collected on this page.
               */

              allergies:
                "",

              disliked_foods:
                "",
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to save diet preference."
        );

      }


      console.log(
        "Diet preference saved:",
        data
      );


    } catch (error) {

      /*
       * The Diet page should continue working
       * even if the backend is unavailable.
       */

      console.error(
        "Diet preference save error:",
        error
      );

    }

  }


  /*
   * ==========================================
   * CHANGE DIET PREFERENCE
   * ==========================================
   */

  function handlePreferenceChange(
    newPreference
  ) {

    if (
      newPreference !==
        "vegetarian" &&
      newPreference !==
        "nonVegetarian"
    ) {

      return;

    }


    /*
     * Update React state.
     */

    setPreference(
      newPreference
    );


    /*
     * Keep localStorage working.
     */

    localStorage.setItem(
      "fitstatsDietPreference",
      newPreference
    );


    /*
     * Save to MySQL.
     */

    saveDietPreferenceToDatabase(
      newPreference
    );

  }


  /*
   * ==========================================
   * CHANGE CALORIE TARGET
   * ==========================================
   */

  function handleTargetChange(
    event
  ) {

    const value =
      Number(
        event.target.value
      );


    /*
     * Don't allow invalid values.
     */

    if (
      !Number.isFinite(value)
    ) {

      return;

    }


    /*
     * Keep the value inside
     * the allowed Diet range.
     */

    const safeValue =
      Math.min(
        Math.max(
          value,
          1000
        ),
        6000
      );


    setTargetCalories(
      safeValue
    );


    /*
     * Keep Dashboard and Diet
     * synchronized.
     */

    localStorage.setItem(
      "fitstatsCalorieTarget",
      String(safeValue)
    );

  }


  /*
   * ==========================================
   * GOAL LABEL
   * ==========================================
   */

  function getGoalLabel() {

    if (
      goal === "lose"
    ) {

      return "Lose Weight";

    }


    if (
      goal === "gain"
    ) {

      return "Gain Weight";

    }


    return "Maintain Weight";

  }


  /*
   * ==========================================
   * GOAL DESCRIPTION
   * ==========================================
   */

  function getGoalDescription() {

    if (
      goal === "lose"
    ) {

      return (
        "Focus on a controlled calorie deficit while maintaining adequate protein."
      );

    }


    if (
      goal === "gain"
    ) {

      return (
        "Focus on a calorie surplus with sufficient protein to support muscle growth."
      );

    }


    return (
      "Focus on maintaining your current body weight with a balanced calorie intake."
    );

  }


  /*
   * ==========================================
   * GOAL ICON
   * ==========================================
   */

  function getGoalIcon() {

    if (
      goal === "lose"
    ) {

      return "🔥";

    }


    if (
      goal === "gain"
    ) {

      return "💪";

    }


    return "⚖️";

  }


  /*
   * ==========================================
   * SELECT DIET DATA
   * ==========================================
   */

  const selectedDiet =
    dietData[
      preference
    ] ||
    dietData.vegetarian;


  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (

    <main className="diet-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <header className="diet-page-header">

        <span className="diet-eyebrow">
          FITSTATS DIET
        </span>


        <h1>
          Diet Planner
        </h1>


        <p>
          Build a daily meal plan based
          on your calorie target and
          fitness goal.
        </p>

      </header>


      {/* =========================
          GOAL CARD
      ========================= */}

      <section className="diet-goal-card">

        <div className="diet-goal-icon">

          {getGoalIcon()}

        </div>


        <div className="diet-goal-content">

          <span className="diet-eyebrow">
            YOUR FITNESS GOAL
          </span>


          <h2>
            {getGoalLabel()}
          </h2>


          <p>
            {getGoalDescription()}
          </p>

        </div>


        <div className="diet-goal-calories">

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

      </section>


      {/* =========================
          CALORIE TARGET
      ========================= */}

      <section className="diet-target-card">

        <div className="diet-target-info">

          <span className="diet-eyebrow">
            DAILY CALORIE TARGET
          </span>


          <h2>
            {targetCalories.toLocaleString()}
            {" "}kcal
          </h2>


          <p>
            This target comes from your
            FitStats Calculator when available.
          </p>

        </div>


        <div className="diet-target-input">

          <label
            htmlFor="targetCalories"
          >
            Adjust Target
          </label>


          <div className="diet-input-wrapper">

            <input
              id="targetCalories"
              type="number"
              value={targetCalories}
              onChange={
                handleTargetChange
              }
              min="1000"
              max="6000"
              step="50"
            />


            <span>
              kcal
            </span>

          </div>

        </div>

      </section>


      {/* =========================
          DIET PREFERENCE
      ========================= */}

      <DietPreference
        preference={
          preference
        }
        onPreferenceChange={
          handlePreferenceChange
        }
      />


      {/* =========================
          MEAL PLAN
      ========================= */}

      <MealPlan
        meals={
          selectedDiet
        }
        targetCalories={
          targetCalories
        }
      />

    </main>

  );

}


export default Diet;