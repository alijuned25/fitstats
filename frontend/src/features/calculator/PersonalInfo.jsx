import { activityLevels } from "./calculatorUtils";

function PersonalInfo({
  formData,
  onChange,
  onCalculate,
}) {
  return (
    <div className="calculator-form">

      {/* =========================
          PERSONAL INFORMATION
      ========================= */}

      <div className="calculator-section">

        <div className="calculator-section-title">

          <h3>
            Personal Information
          </h3>

          <p>
            Enter your details to calculate
            your daily calorie needs.
          </p>

        </div>


        {/* AGE */}

        <div className="form-group">

          <label>
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Enter your age"
            min="1"
            max="120"
          />

        </div>


        {/* GENDER */}

        <div className="form-group">

          <label>
            Gender
          </label>

          <div className="gender-options">

            <button
              type="button"
              className={
                formData.gender === "male"
                  ? "gender-option active"
                  : "gender-option"
              }
              onClick={() =>
                onChange({
                  target: {
                    name: "gender",
                    value: "male",
                  },
                })
              }
            >
              Male
            </button>


            <button
              type="button"
              className={
                formData.gender === "female"
                  ? "gender-option active"
                  : "gender-option"
              }
              onClick={() =>
                onChange({
                  target: {
                    name: "gender",
                    value: "female",
                  },
                })
              }
            >
              Female
            </button>

          </div>

        </div>


        {/* HEIGHT + WEIGHT */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Height
            </label>

            <div className="input-with-unit">

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={onChange}
                placeholder="175"
                min="1"
              />

              <span>
                cm
              </span>

            </div>

          </div>


          <div className="form-group">

            <label>
              Weight
            </label>

            <div className="input-with-unit">

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={onChange}
                placeholder="70"
                min="1"
              />

              <span>
                kg
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          ACTIVITY LEVEL
      ========================= */}

      <div className="calculator-section">

        <div className="calculator-section-title">

          <h3>
            Activity Level
          </h3>

          <p>
            How active are you during
            a typical week?
          </p>

        </div>


        <div className="activity-options">

          {activityLevels.map(
            (activity) => (

              <button
                key={activity.value}
                type="button"
                className={
                  formData.activityLevel ===
                  activity.value
                    ? "activity-option active"
                    : "activity-option"
                }
                onClick={() =>
                  onChange({
                    target: {
                      name:
                        "activityLevel",
                      value:
                        activity.value,
                    },
                  })
                }
              >

                <span className="activity-name">
                  {activity.label}
                </span>

                <span className="activity-description">
                  {activity.description}
                </span>

              </button>

            )
          )}

        </div>

      </div>


      {/* =========================
          GOAL
      ========================= */}

      <div className="calculator-section">

        <div className="calculator-section-title">

          <h3>
            Your Goal
          </h3>

          <p>
            What do you want to achieve?
          </p>

        </div>


        <div className="goal-options">

          {/* Lose */}

          <button
            type="button"
            className={
              formData.goal === "lose"
                ? "goal-option active"
                : "goal-option"
            }
            onClick={() =>
              onChange({
                target: {
                  name: "goal",
                  value: "lose",
                },
              })
            }
          >

            <span className="goal-title">
              Lose Weight
            </span>

            <span className="goal-description">
              Create a calorie deficit
            </span>

          </button>


          {/* Maintain */}

          <button
            type="button"
            className={
              formData.goal === "maintain"
                ? "goal-option active"
                : "goal-option"
            }
            onClick={() =>
              onChange({
                target: {
                  name: "goal",
                  value: "maintain",
                },
              })
            }
          >

            <span className="goal-title">
              Maintain Weight
            </span>

            <span className="goal-description">
              Stay around your current weight
            </span>

          </button>


          {/* Gain */}

          <button
            type="button"
            className={
              formData.goal === "gain"
                ? "goal-option active"
                : "goal-option"
            }
            onClick={() =>
              onChange({
                target: {
                  name: "goal",
                  value: "gain",
                },
              })
            }
          >

            <span className="goal-title">
              Gain Weight
            </span>

            <span className="goal-description">
              Create a calorie surplus
            </span>

          </button>

        </div>

      </div>


      {/* =========================
          CALCULATE BUTTON
      ========================= */}

      <button
        className="calculate-button"
        onClick={onCalculate}
      >
        Calculate My Calories
      </button>

    </div>
  );
}

export default PersonalInfo;