function DietPreference({
  preference,
  onPreferenceChange,
}) {
  return (
    <section className="diet-preference">

      <div className="diet-section-header">

        <span className="diet-eyebrow">
          DIET PREFERENCE
        </span>

        <h2>
          Choose Your Diet
        </h2>

        <p>
          Select the type of meals you prefer
          for your daily plan.
        </p>

      </div>


      <div className="diet-preference-options">

        {/* Vegetarian */}

        <button
          type="button"
          className={
            preference === "vegetarian"
              ? "diet-preference-card active"
              : "diet-preference-card"
          }
          onClick={() =>
            onPreferenceChange("vegetarian")
          }
        >

          <div className="diet-preference-icon">
            🥗
          </div>

          <div className="diet-preference-content">

            <h3>
              Vegetarian
            </h3>

            <p>
              Plant-based meals with
              vegetarian protein sources.
            </p>

          </div>

        </button>


        {/* Non-Vegetarian */}

        <button
          type="button"
          className={
            preference === "nonVegetarian"
              ? "diet-preference-card active"
              : "diet-preference-card"
          }
          onClick={() =>
            onPreferenceChange(
              "nonVegetarian"
            )
          }
        >

          <div className="diet-preference-icon">
            🍗
          </div>

          <div className="diet-preference-content">

            <h3>
              Non-Vegetarian
            </h3>

            <p>
              Includes eggs, chicken and
              other animal protein.
            </p>

          </div>

        </button>

      </div>

    </section>
  );
}

export default DietPreference;