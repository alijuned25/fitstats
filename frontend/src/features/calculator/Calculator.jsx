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


  function handleCalculate() {
    const age = Number(formData.age);
    const height = Number(formData.height);
    const weight = Number(formData.weight);


    if (!age || !height || !weight) {
      alert(
        "Please enter your age, height and weight."
      );

      return;
    }


    if (age < 1 || age > 120) {
      alert(
        "Please enter a valid age."
      );

      return;
    }


    if (height <= 0 || weight <= 0) {
      alert(
        "Height and weight must be greater than zero."
      );

      return;
    }


    const bmi = calculateBMI(
      weight,
      height
    );

    const bmiCategory =
      getBMICategory(bmi);


    const bmr = calculateBMR(
      formData.gender,
      weight,
      height,
      age
    );


    const tdee = calculateTDEE(
      bmr,
      formData.activityLevel
    );


    const goalCalories =
      calculateGoalCalories(
        tdee,
        formData.goal
      );


    const calculatedResults = {
      bmi,
      bmiCategory,
      bmr,
      tdee,
      goalCalories,
      goal: formData.goal,
    };


    setResults(
      calculatedResults
    );


    /*
     * Save the calorie target so the
     * Diet Planner can use it.
     */

    localStorage.setItem(
      "fitstatsCalorieTarget",
      String(goalCalories)
    );


    /*
     * Save the complete calculator
     * results for future features.
     */

    localStorage.setItem(
      "fitstatsCalculatorResults",
      JSON.stringify(
        calculatedResults
      )
    );
  }


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

        <div className="calculator-card">

          <PersonalInfo
            formData={formData}
            onChange={handleChange}
            onCalculate={
              handleCalculate
            }
          />

        </div>


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