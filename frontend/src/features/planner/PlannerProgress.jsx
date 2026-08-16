function PlannerProgress({
  tasks,
  monthName,
  year,
}) {
  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const remainingTasks =
    totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) *
            100
        );

  return (
    <section className="planner-progress">

      {/* Header */}

      <div className="planner-progress-header">

        <div>
          <h3>
            {monthName} Progress
          </h3>

          <p>
            Track your monthly consistency
          </p>
        </div>

        <div className="planner-progress-percentage">
          {progress}%
        </div>

      </div>


      {/* Progress Bar */}

      <div className="planner-progress-bar">

        <div
          className="planner-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>


      {/* Statistics */}

      <div className="planner-progress-stats">

        <div className="planner-stat">

          <span className="planner-stat-value">
            {totalTasks}
          </span>

          <span className="planner-stat-label">
            Total Tasks
          </span>

        </div>


        <div className="planner-stat">

          <span className="planner-stat-value">
            {completedTasks}
          </span>

          <span className="planner-stat-label">
            Completed
          </span>

        </div>


        <div className="planner-stat">

          <span className="planner-stat-value">
            {remainingTasks}
          </span>

          <span className="planner-stat-label">
            Remaining
          </span>

        </div>

      </div>

    </section>
  );
}

export default PlannerProgress;