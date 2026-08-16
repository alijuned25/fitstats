function Results({ results }) {
  const {
    bmi,
    bmiCategory,
    bmr,
    tdee,
    goalCalories,
    goal,
  } = results;


  function getGoalLabel() {
    if (goal === "lose") {
      return "Weight Loss";
    }

    if (goal === "gain") {
      return "Weight Gain";
    }

    return "Weight Maintenance";
  }


  return (
    <div className="results-container">

      {/* =========================
          RESULTS HEADER
      ========================= */}

      <div className="results-header">

        <span className="calculator-eyebrow">
          YOUR RESULTS
        </span>

        <h2>
          Your Daily Numbers
        </h2>

        <p>
          Use these numbers as a starting
          point for your fitness journey.
        </p>

      </div>


      {/* =========================
          BMI
      ========================= */}

      <div className="result-primary-card">

        <div className="result-primary-info">

          <span className="result-label">
            Body Mass Index
          </span>

          <div className="bmi-value">
            {bmi}
          </div>

          <span className="bmi-category">
            {bmiCategory}
          </span>

        </div>

      </div>


      {/* =========================
          BMR + TDEE
      ========================= */}

      <div className="result-grid">

        <div className="result-card">

          <span className="result-label">
            BMR
          </span>

          <strong>
            {bmr.toLocaleString()}
          </strong>

          <span className="result-unit">
            kcal / day
          </span>

          <p>
            Calories your body needs
            at complete rest.
          </p>

        </div>


        <div className="result-card">

          <span className="result-label">
            TDEE
          </span>

          <strong>
            {tdee.toLocaleString()}
          </strong>

          <span className="result-unit">
            kcal / day
          </span>

          <p>
            Estimated calories you burn
            each day with activity.
          </p>

        </div>

      </div>


      {/* =========================
          GOAL CALORIES
      ========================= */}

      <div className="goal-calorie-card">

        <div>

          <span className="result-label">
            Your Goal
          </span>

          <h3>
            {getGoalLabel()}
          </h3>

        </div>


        <div className="goal-calories">

          <strong>
            {goalCalories.toLocaleString()}
          </strong>

          <span>
            kcal / day
          </span>

        </div>

      </div>


      {/* =========================
          EXPLANATION
      ========================= */}

      <div className="result-note">

        <strong>
          What this means
        </strong>

        {goal === "lose" && (
          <p>
            Your target calories are set
            below your estimated maintenance
            level to create a calorie deficit.
          </p>
        )}

        {goal === "maintain" && (
          <p>
            Your target calories are around
            your estimated maintenance level
            to help maintain your current weight.
          </p>
        )}

        {goal === "gain" && (
          <p>
            Your target calories are set
            above your estimated maintenance
            level to create a calorie surplus.
          </p>
        )}

      </div>

    </div>
  );
}

export default Results;