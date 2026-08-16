import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getCalorieTarget,
  getDashboardNutrition,
  getDashboardWorkout,
  getDashboardPlanner,
  getCalculatorData,
} from "./dashboardUtils";


/*
 * =========================================================
 * GET COMPLETE DASHBOARD DATA
 * =========================================================
 */

function getDashboardData() {

  return {

    calculatorResults:
      getCalculatorData(),

    targetCalories:
      getCalorieTarget(),

    nutrition:
      getDashboardNutrition(),

    workout:
      getDashboardWorkout(),

    planner:
      getDashboardPlanner(),

  };

}


function Dashboard() {

  /*
   * =========================================================
   * ROUTER LOCATION
   * =========================================================
   */

  const location =
    useLocation();


  /*
   * =========================================================
   * DASHBOARD STATE
   * =========================================================
   */

  const [
    dashboardData,
    setDashboardData,
  ] = useState(
    getDashboardData()
  );


  /*
   * =========================================================
   * REFRESH DASHBOARD
   * =========================================================
   */

  function refreshDashboard() {

    setDashboardData(
      getDashboardData()
    );

  }


  /*
   * =========================================================
   * REFRESH WHEN NAVIGATION CHANGES
   * =========================================================
   */

  useEffect(() => {

    refreshDashboard();

  }, [location.key]);


  /*
   * =========================================================
   * REFRESH WHEN WINDOW GETS FOCUS
   * =========================================================
   */

  useEffect(() => {

    function handleWindowFocus() {

      refreshDashboard();

    }


    window.addEventListener(
      "focus",
      handleWindowFocus
    );


    return () => {

      window.removeEventListener(
        "focus",
        handleWindowFocus
      );

    };

  }, []);


  /*
   * =========================================================
   * EXTRACT DATA
   * =========================================================
   */

  const {
    calculatorResults,
    targetCalories,
    nutrition,
    workout,
    planner,
  } = dashboardData;


  /*
   * =========================================================
   * NUTRITION DATA
   * =========================================================
   */

  const consumedCalories =
    nutrition.consumed.calories;


  const consumedProtein =
    nutrition.consumed.protein;


  const consumedCarbs =
    nutrition.consumed.carbs;


  const consumedFat =
    nutrition.consumed.fat;


  const completedMeals =
    nutrition.consumed.completedCount;


  const totalMeals =
    4;


  const caloriePercentage =
    nutrition.percentages.calories;


  /*
   * =========================================================
   * WORKOUT DATA
   * =========================================================
   */

  const workoutPercentage =
    workout.exercisePercentage;


  /*
   * =========================================================
   * PLANNER DATA
   * =========================================================
   */

  const plannerPercentage =
    planner.percentage;


  /*
   * =========================================================
   * OVERALL DAILY PROGRESS
   * =========================================================
   *
   * We combine three areas:
   *
   * Nutrition
   * Workout
   * Planner
   *
   * Each contributes equally.
   */

  const overallProgress =
    Math.round(
      (
        caloriePercentage +
        workoutPercentage +
        plannerPercentage
      ) / 3
    );


  /*
   * =========================================================
   * DAILY STATUS
   * =========================================================
   */

  function getDailyStatus() {

    if (
      overallProgress >= 100
    ) {

      return {
        title: "Day Completed!",
        description:
          "Excellent work. You've completed your main goals for today.",
      };

    }


    if (
      overallProgress >= 75
    ) {

      return {
        title: "Almost There!",
        description:
          "You're having a strong day. Finish the remaining goals.",
      };

    }


    if (
      overallProgress >= 50
    ) {

      return {
        title: "Great Progress!",
        description:
          "You're halfway there. Keep building momentum.",
      };

    }


    if (
      overallProgress > 0
    ) {

      return {
        title: "Good Start!",
        description:
          "You've started your day. Keep going and stay consistent.",
      };

    }


    return {
      title: "Ready to Start?",
      description:
        "Complete your meals, workout and planner tasks to build your progress.",
    };

  }


  const dailyStatus =
    getDailyStatus();


  /*
   * =========================================================
   * FITNESS GOAL
   * =========================================================
   */

  const goal =
    calculatorResults?.goal ||
    "maintain";


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
   * =========================================================
   * TODAY
   * =========================================================
   */

  const today =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (

    <main className="dashboard-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-header">

        <div>

          <span className="dashboard-eyebrow">
            FITSTATS DASHBOARD
          </span>


          <h1>
            Good to see you.
          </h1>


          <p>
            Here's your fitness overview
            for today.
          </p>

        </div>


        <div className="dashboard-date">

          <span>
            TODAY
          </span>


          <strong>
            {today}
          </strong>

        </div>

      </header>


      {/* =================================================
          QUICK STATS
      ================================================= */}

      <section className="dashboard-stats">


        {/* Calories */}

        <article className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            🔥
          </div>


          <div>

            <span>
              Daily Calories
            </span>


            <strong>
              {targetCalories.toLocaleString()}
            </strong>


            <small>
              kcal target
            </small>

          </div>

        </article>


        {/* Goal */}

        <article className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            🎯
          </div>


          <div>

            <span>
              Fitness Goal
            </span>


            <strong>
              {getGoalLabel()}
            </strong>


            <small>
              Current goal
            </small>

          </div>

        </article>


        {/* BMI */}

        <article className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            ⚖️
          </div>


          <div>

            <span>
              BMI
            </span>


            <strong>

              {calculatorResults?.bmi
                ? calculatorResults.bmi.toFixed(1)
                : "--"}

            </strong>


            <small>

              {calculatorResults?.bmiCategory ||
                "Calculate your BMI"}

            </small>

          </div>

        </article>


        {/* TDEE */}

        <article className="dashboard-stat-card">

          <div className="dashboard-stat-icon">
            ⚡
          </div>


          <div>

            <span>
              TDEE
            </span>


            <strong>

              {calculatorResults?.tdee
                ? Math.round(
                    calculatorResults.tdee
                  ).toLocaleString()
                : "--"}

            </strong>


            <small>
              kcal / day
            </small>

          </div>

        </article>

      </section>


      {/* =================================================
          DAILY COMPLETION
      ================================================= */}

      <section className="dashboard-daily-card">


        <div className="dashboard-daily-header">

          <div>

            <span className="dashboard-card-eyebrow">
              DAILY OVERVIEW
            </span>


            <h2>
              {dailyStatus.title}
            </h2>


            <p>
              {dailyStatus.description}
            </p>

          </div>


          <div className="dashboard-daily-percentage">

            <strong>
              {overallProgress}%
            </strong>


            <span>
              complete
            </span>

          </div>

        </div>


        {/* Overall progress bar */}

        <div className="dashboard-overall-bar">

          <div
            className="dashboard-overall-fill"
            style={{
              width:
                `${overallProgress}%`,
            }}
          ></div>

        </div>


        {/* Daily categories */}

        <div className="dashboard-daily-grid">


          {/* Meals */}

          <div className="dashboard-daily-item">

            <span className="dashboard-daily-icon">
              🍽️
            </span>


            <div>

              <strong>
                Meals
              </strong>


              <span>
                {completedMeals}
                {" / "}
                {totalMeals}
                {" "}completed
              </span>

            </div>


            <b>
              {Math.round(
                (
                  completedMeals /
                  totalMeals
                ) * 100
              )}%
            </b>

          </div>


          {/* Workout */}

          <div className="dashboard-daily-item">

            <span className="dashboard-daily-icon">
              🏋️
            </span>


            <div>

              <strong>
                Workout
              </strong>


              <span>
                {workout.completedExercises}
                {" / "}
                {workout.totalExercises}
                {" "}exercises
              </span>

            </div>


            <b>
              {workoutPercentage}%
            </b>

          </div>


          {/* Planner */}

          <div className="dashboard-daily-item">

            <span className="dashboard-daily-icon">
              📅
            </span>


            <div>

              <strong>
                Planner
              </strong>


              <span>
                {planner.completedTasks}
                {" / "}
                {planner.totalTasks}
                {" "}tasks
              </span>

            </div>


            <b>
              {plannerPercentage}%
            </b>

          </div>

        </div>

      </section>


      {/* =================================================
          MAIN GRID
      ================================================= */}

      <section className="dashboard-grid">


        {/* =================================================
            TODAY'S PROGRESS
        ================================================= */}

        <article className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-card-eyebrow">
                TODAY
              </span>


              <h2>
                Your Progress
              </h2>

            </div>

          </div>


          <div className="dashboard-progress-list">


            {/* Nutrition */}

            <div className="dashboard-progress-item">

              <div className="dashboard-progress-label">

                <span>
                  Nutrition
                </span>


                <strong>
                  {consumedCalories.toLocaleString()}
                  {" / "}
                  {targetCalories.toLocaleString()}
                  {" "}kcal
                </strong>

              </div>


              <div className="dashboard-progress-bar">

                <div
                  className="dashboard-progress-fill"
                  style={{
                    width:
                      `${caloriePercentage}%`,
                  }}
                ></div>

              </div>


              <div className="dashboard-progress-meta">

                <span>
                  {caloriePercentage}%
                  {" "}of calorie target
                </span>


                <span>
                  {completedMeals}
                  {" / "}
                  {totalMeals}
                  {" "}meals eaten
                </span>

              </div>

            </div>


            {/* Workout */}

            <div className="dashboard-progress-item">

              <div className="dashboard-progress-label">

                <span>
                  Workout
                </span>


                <strong>
                  {workout.completedExercises}
                  {" / "}
                  {workout.totalExercises}
                  {" "}exercises
                </strong>

              </div>


              <div className="dashboard-progress-bar">

                <div
                  className="dashboard-progress-fill"
                  style={{
                    width:
                      `${workoutPercentage}%`,
                  }}
                ></div>

              </div>


              <div className="dashboard-progress-meta">

                <span>
                  {workoutPercentage}%
                  {" "}completed
                </span>


                <span>
                  {workout.completedDays}
                  {" / "}
                  {workout.totalDays}
                  {" "}days completed
                </span>

              </div>

            </div>


            {/* Planner */}

            <div className="dashboard-progress-item">

              <div className="dashboard-progress-label">

                <span>
                  Planner
                </span>


                <strong>
                  {planner.completedTasks}
                  {" / "}
                  {planner.totalTasks}
                  {" "}tasks
                </strong>

              </div>


              <div className="dashboard-progress-bar">

                <div
                  className="dashboard-progress-fill"
                  style={{
                    width:
                      `${plannerPercentage}%`,
                  }}
                ></div>

              </div>


              <div className="dashboard-progress-meta">

                <span>
                  {plannerPercentage}%
                  {" "}completed
                </span>


                <span>
                  Today's tasks
                </span>

              </div>

            </div>


          </div>

        </article>


        {/* =================================================
            NUTRITION SUMMARY
        ================================================= */}

        <article className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-card-eyebrow">
                NUTRITION
              </span>


              <h2>
                Today's Intake
              </h2>

            </div>

          </div>


          <div className="dashboard-macro-grid">


            <div className="dashboard-macro-item">

              <span>
                Protein
              </span>


              <strong>
                {Math.round(
                  consumedProtein
                )}g
              </strong>

            </div>


            <div className="dashboard-macro-item">

              <span>
                Carbs
              </span>


              <strong>
                {Math.round(
                  consumedCarbs
                )}g
              </strong>

            </div>


            <div className="dashboard-macro-item">

              <span>
                Fat
              </span>


              <strong>
                {Math.round(
                  consumedFat
                )}g
              </strong>

            </div>


            <div className="dashboard-macro-item">

              <span>
                Remaining
              </span>


              <strong>
                {nutrition.remainingCalories.toLocaleString()}
                {" "}kcal
              </strong>

            </div>

          </div>

        </article>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <article className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-card-eyebrow">
                QUICK ACTIONS
              </span>


              <h2>
                Continue Your Journey
              </h2>

            </div>

          </div>


          <div className="dashboard-actions">


            <Link
              to="/workout"
              className="dashboard-action"
            >

              <span>
                🏋️
              </span>


              <div>

                <strong>
                  Workout
                </strong>


                <small>
                  Start training
                </small>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              to="/diet"
              className="dashboard-action"
            >

              <span>
                🥗
              </span>


              <div>

                <strong>
                  Diet
                </strong>


                <small>
                  Track nutrition
                </small>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              to="/planner"
              className="dashboard-action"
            >

              <span>
                📅
              </span>


              <div>

                <strong>
                  Planner
                </strong>


                <small>
                  Plan your day
                </small>

              </div>


              <b>
                →
              </b>

            </Link>


            <Link
              to="/calculator"
              className="dashboard-action"
            >

              <span>
                🧮
              </span>


              <div>

                <strong>
                  Calculator
                </strong>


                <small>
                  Update your numbers
                </small>

              </div>


              <b>
                →
              </b>

            </Link>

          </div>

        </article>


      </section>


      {/* =================================================
          AI COACH
      ================================================= */}

      <section className="dashboard-ai-card">

        <div className="dashboard-ai-icon">
          ✦
        </div>


        <div className="dashboard-ai-content">

          <span>
            FITSTATS AI COACH
          </span>


          <h2>
            Your personal fitness assistant
          </h2>


          <p>
            Get personalized workout,
            nutrition and progress
            recommendations based on your
            FitStats data.
          </p>

        </div>


        <Link
          to="/ai"
          className="dashboard-ai-button"
        >
          Open AI Coach
        </Link>

      </section>


    </main>

  );

}


export default Dashboard;