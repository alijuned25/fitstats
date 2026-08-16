/*
 * =========================================================
 * FITSTATS PLANNER STORAGE
 * =========================================================
 *
 * Shared Planner storage used by:
 *
 * - Calendar
 * - Dashboard
 *
 */

const PLANNER_STORAGE_KEY =
  "fitstatsPlannerTasks";


/*
 * =========================================================
 * GET SAVED PLANNER TASKS
 * =========================================================
 */

export function getPlannerTasks() {

  const savedTasks =
    localStorage.getItem(
      PLANNER_STORAGE_KEY
    );


  if (!savedTasks) {
    return {};
  }


  try {

    return JSON.parse(
      savedTasks
    );

  } catch {

    return {};

  }
}


/*
 * =========================================================
 * SAVE PLANNER TASKS
 * =========================================================
 */

export function savePlannerTasks(
  tasks
) {

  localStorage.setItem(
    PLANNER_STORAGE_KEY,
    JSON.stringify(tasks)
  );

}


/*
 * =========================================================
 * GET TODAY'S TASKS
 * =========================================================
 */

export function getTodayPlannerTasks() {

  const today =
    new Date();


  const year =
    today.getFullYear();


  const month =
    today.getMonth() + 1;


  const day =
    today.getDate();


  const dateKey =
    `${year}-${month}-${day}`;


  const tasks =
    getPlannerTasks();


  return tasks[dateKey] || [];

}


/*
 * =========================================================
 * GET MONTH TASKS
 * =========================================================
 */

export function getMonthPlannerTasks(
  year,
  month
) {

  const tasks =
    getPlannerTasks();


  const monthTasks = [];


  const prefix =
    `${year}-${month + 1}-`;


  Object.entries(tasks).forEach(
    ([dateKey, dayTasks]) => {

      if (
        dateKey.startsWith(prefix)
      ) {

        monthTasks.push(
          ...dayTasks
        );

      }

    }
  );


  return monthTasks;
}


/*
 * =========================================================
 * GET TODAY'S PLANNER PROGRESS
 * =========================================================
 */

export function getTodayPlannerProgress() {

  const tasks =
    getTodayPlannerTasks();


  const totalTasks =
    tasks.length;


  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    ).length;


  const percentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );


  return {

    totalTasks,

    completedTasks,

    percentage,

  };

}