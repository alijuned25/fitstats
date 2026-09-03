import { useState } from "react";

import PersonalInfo from "./PersonalInfo";
import Results from "./Results";

import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateGoalCalories,
} from "./calculatorUtils";


function Calculator() {

  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "moderate",
    goal: "maintain",
  });


  const [results, setResults] = useState(null);


  /*
   * =========================================================
   * HANDLE FORM CHANGES
   * =========================================================
   */

  function handleChange(event) {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }


  /*
   * =========================================================
   * SAVE FITNESS PROFILE TO MYSQL
   * =========================================================
   */

  async function saveProfileToDatabase(calculatedResults) {

    try {

      /*
       * For now we use user ID 1 because authentication
       * has not been implemented yet.
       *
       * Later this will come from the logged-in user.
       */

      const userId =
        localStorage.getItem("fitstatsUserId") || "1";


      /*
       * Convert frontend values into readable database values.
       */

      const activityLabels = {

        sedentary:
          "Sedentary",

        light:
          "Lightly Active",

        moderate:
          "Moderately Active",

        active:
          "Very Active",

        veryActive:
          "Extra Active",
      };


      const goalLabels = {

        lose:
          "Weight Loss",

        maintain:
          "Maintain Weight",

        gain:
          "Weight Gain",
      };


      const genderLabel =
        formData.gender === "male"
          ? "Male"
          : "Female";


      const activityLabel =
        activityLabels[
          formData.activityLevel
        ] || formData.activityLevel;


      const goalLabel =
        goalLabels[
          formData.goal
        ] || formData.goal;


      /*
       * Send calculator data to Express backend.
       */

      const response =
        await fetch(
          "http://localhost:5000/api/profile",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              user_id:
                Number(userId),

              age:
                Number(formData.age),

              gender:
                genderLabel,

              height_cm:
                Number(formData.height),

              weight_kg:
                Number(formData.weight),

              activity_level:
                activityLabel,

              fitness_goal:
                goalLabel,

              bmi:
                Number(
                  calculatedResults.bmi
                ),

              bmr:
                Number(
                  calculatedResults.bmr
                ),

              tdee:
                Number(
                  calculatedResults.tdee
                ),

              calorie_target:
                Number(
                  calculatedResults.goalCalories
                ),
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to save fitness profile."
        );
      }


      console.log(
        "Fitness profile saved:",
        data
      );


      /*
       * Save the user ID locally for future requests.
       */

      localStorage.setItem(
        "fitstatsUserId",
        String(userId)
      );


    } catch (error) {

      /*
       * The calculator should still work even if
       * the backend is temporarily unavailable.
       */

      console.error(
        "Profile save error:",
        error
      );

    }

  }


  /*
   * =========================================================
   * CALCULATE FITNESS RESULTS
   * =========================================================
   */

  async function handleCalculate() {

    const age =
      Number(formData.age);

    const height =
      Number(formData.height);

    const weight =
      Number(formData.weight);


    /*
     * Basic validation
     */

    if (
      !age ||
      !height ||
      !weight
    ) {

      alert(
        "Please enter your age, height and weight."
      );

      return;
    }


    /*
     * Age validation
     */

    if (
      age < 1 ||
      age > 120
    ) {

      alert(
        "Please enter a valid age."
      );

      return;
    }


    /*
     * Height and weight validation
     */

    if (
      height <= 0 ||
      weight <= 0
    ) {

      alert(
        "Height and weight must be greater than zero."
      );

      return;
    }


    /*
     * Calculate BMI
     */

    const bmi =
      calculateBMI(
        weight,
        height
      );


    /*
     * Get BMI category
     */

    const bmiCategory =
      getBMICategory(
        bmi
      );


    /*
     * Calculate BMR
     */

    const bmr =
      calculateBMR(
        formData.gender,
        weight,
        height,
        age
      );


    /*
     * Calculate TDEE
     */

    const tdee =
      calculateTDEE(
        bmr,
        formData.activityLevel
      );


    /*
     * Calculate calorie target
     */

    const goalCalories =
      calculateGoalCalories(
        tdee,
        formData.goal
      );


    /*
     * Complete result object
     */

    const calculatedResults = {

      bmi,

      bmiCategory,

      bmr,

      tdee,

      goalCalories,

      goal:
        formData.goal,
    };


    /*
     * Show results immediately.
     */

    setResults(
      calculatedResults
    );


    /*
     * =======================================================
     * LOCAL STORAGE
     * =======================================================
     *
     * These existing features continue working.
     */


    localStorage.setItem(
      "fitstatsCalorieTarget",
      String(goalCalories)
    );


    localStorage.setItem(
      "fitstatsCalculatorResults",
      JSON.stringify(
        calculatedResults
      )
    );


    /*
     * =======================================================
     * MYSQL
     * =======================================================
     *
     * Save the same calculator information to MySQL.
     */

    await saveProfileToDatabase(
      calculatedResults
    );

  }


  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (

    <main className="calculator-page">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="calculator-page-header">

        <div>

          <span className="calculator-eyebrow">
            FITSTATS CALCULATOR
          </span>


          <h1>
            Know Your Numbers
          </h1>


          <p>
            Calculate your BMI, BMR, TDEE
            and daily calorie needs.
          </p>

        </div>

      </div>


      {/* =========================
          CALCULATOR CONTENT
      ========================= */}

      <div className="calculator-layout">


        {/* =========================
            PERSONAL INFORMATION
        ========================= */}

        <div className="calculator-card">

          <PersonalInfo
            formData={formData}

            onChange={
              handleChange
            }

            onCalculate={
              handleCalculate
            }
          />

        </div>


        {/* =========================
            RESULTS
        ========================= */}

        <div className="calculator-results-wrapper">

          {results ? (

            <Results
              results={results}
            />

          ) : (

            <div className="calculator-empty-results">

              <div className="calculator-empty-icon">
                ⚡
              </div>


              <h3>
                Your Results
              </h3>


              <p>
                Enter your information and
                calculate your daily calorie
                requirements.
              </p>

            </div>

          )}

        </div>

      </div>

    </main>

  );
}


export default Calculator;