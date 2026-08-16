const taskCategories = [
  {
    value: "workout",
    label: "Workout",
    icon: "🏋️",
  },
  {
    value: "diet",
    label: "Diet",
    icon: "🥗",
  },
  {
    value: "water",
    label: "Water",
    icon: "💧",
  },
  {
    value: "cardio",
    label: "Cardio",
    icon: "🏃",
  },
  {
    value: "personal",
    label: "Personal",
    icon: "📝",
  },
];

function PlannerStats({ tasks }) {
  return (
    <section className="planner-stats">

      <div className="planner-stats-header">

        <div>
          <h3>Activity Overview</h3>

          <p>
            Your monthly activity by category
          </p>
        </div>

      </div>


      <div className="planner-stats-grid">

        {taskCategories.map((category) => {

          const categoryTasks =
            tasks.filter(
              (task) =>
                task.category ===
                category.value
            );

          const total =
            categoryTasks.length;

          const completed =
            categoryTasks.filter(
              (task) =>
                task.completed
            ).length;

          const progress =
            total === 0
              ? 0
              : Math.round(
                  (completed / total) *
                    100
                );

          return (
            <div
              className="planner-stat-card"
              key={category.value}
            >

              <div className="planner-stat-top">

                <div className="planner-stat-icon">
                  {category.icon}
                </div>

                <div className="planner-stat-info">

                  <h4>
                    {category.label}
                  </h4>

                  <span>
                    {total}{" "}
                    {total === 1
                      ? "task"
                      : "tasks"}
                  </span>

                </div>

              </div>


              <div className="planner-stat-progress">

                <div className="planner-stat-progress-bar">

                  <div
                    className="planner-stat-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>

                </div>

                <span>
                  {completed}/{total}
                </span>

              </div>

            </div>
          );

        })}

      </div>

    </section>
  );
}

export default PlannerStats;