import { useEffect, useState } from "react";

import CalendarDay from "./CalendarDay";
import TaskList from "./TaskList";
import PlannerProgress from "./PlannerProgress";
import PlannerStats from "./PlannerStats";

import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthName,
} from "./plannerUtils";

import {
  getPlannerTasks,
  savePlannerTasks,
} from "./plannerStorage";


function Calendar() {

  const today = new Date();


  /*
   * ==========================================
   * CALENDAR STATE
   * ==========================================
   */

  const [
    currentDate,
    setCurrentDate,
  ] = useState(today);


  const [
    selectedDay,
    setSelectedDay,
  ] = useState(
    today.getDate()
  );


  /*
   * ==========================================
   * LOAD SAVED TASKS
   * ==========================================
   */

  const [
    tasks,
    setTasks,
  ] = useState(
    getPlannerTasks()
  );


  const [
    newTask,
    setNewTask,
  ] = useState("");


  const [
    newTaskCategory,
    setNewTaskCategory,
  ] = useState("workout");


  /*
   * ==========================================
   * CURRENT YEAR AND MONTH
   * ==========================================
   */

  const year =
    currentDate.getFullYear();


  const month =
    currentDate.getMonth();


  /*
   * ==========================================
   * CALENDAR INFORMATION
   * ==========================================
   */

  const daysInMonth =
    getDaysInMonth(
      year,
      month
    );


  const firstDay =
    getFirstDayOfMonth(
      year,
      month
    );


  const monthName =
    getMonthName(
      month
    );


  /*
   * ==========================================
   * CREATE UNIQUE DATE KEY
   * ==========================================
   */

  function getDateKey(day) {

    return `${year}-${month + 1}-${day}`;

  }


  /*
   * ==========================================
   * SELECTED DATE
   * ==========================================
   */

  const selectedDateKey =
    selectedDay
      ? getDateKey(
          selectedDay
        )
      : null;


  /*
   * ==========================================
   * SELECTED DATE TASKS
   * ==========================================
   */

  const selectedTasks =
    selectedDateKey
      ? tasks[
          selectedDateKey
        ] || []
      : [];


  /*
   * ==========================================
   * CURRENT MONTH TASKS
   * ==========================================
   */

  const currentMonthTasks = [];


  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const dateKey =
      getDateKey(
        day
      );


    const dayTasks =
      tasks[
        dateKey
      ] || [];


    currentMonthTasks.push(
      ...dayTasks
    );

  }


  /*
   * ==========================================
   * USER ID
   * ==========================================
   */

  function getUserId() {

    return Number(
      localStorage.getItem(
        "fitstatsUserId"
      ) || "1"
    );

  }


  /*
   * ==========================================
   * SAVE TASK TO DATABASE
   * ==========================================
   */

  async function saveTaskToDatabase(
    task,
    dateKey
  ) {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/planner",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              user_id:
                getUserId(),

              task_name:
                task.title,

              category:
                task.category,

              task_date:
                dateKey,

              completed:
                task.completed,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to save planner task."
        );

      }


      console.log(
        "Planner task saved:",
        data
      );


      return data.taskId;

    } catch (error) {

      console.error(
        "Planner database save error:",
        error
      );

      return null;

    }

  }


  /*
   * ==========================================
   * UPDATE TASK IN DATABASE
   * ==========================================
   */

  async function updateTaskInDatabase(
    task
  ) {

    if (!task.dbId) {
      return;
    }


    try {

      const response =
        await fetch(
          `http://localhost:5000/api/planner/${task.dbId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              task_name:
                task.title,

              category:
                task.category,

              completed:
                task.completed,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to update planner task."
        );

      }


      console.log(
        "Planner task updated:",
        data
      );

    } catch (error) {

      console.error(
        "Planner database update error:",
        error
      );

    }

  }


  /*
   * ==========================================
   * DELETE TASK FROM DATABASE
   * ==========================================
   */

  async function deleteTaskFromDatabase(
    task
  ) {

    if (!task.dbId) {
      return;
    }


    try {

      const response =
        await fetch(
          `http://localhost:5000/api/planner/${task.dbId}`,
          {
            method: "DELETE",
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.message ||
          "Unable to delete planner task."
        );

      }


      console.log(
        "Planner task deleted:",
        data
      );

    } catch (error) {

      console.error(
        "Planner database delete error:",
        error
      );

    }

  }


  /*
   * ==========================================
   * PREVIOUS MONTH
   * ==========================================
   */

  function goToPreviousMonth() {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );


    setSelectedDay(
      null
    );


    setNewTask(
      ""
    );


    setNewTaskCategory(
      "workout"
    );

  }


  /*
   * ==========================================
   * NEXT MONTH
   * ==========================================
   */

  function goToNextMonth() {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );


    setSelectedDay(
      null
    );


    setNewTask(
      ""
    );


    setNewTaskCategory(
      "workout"
    );

  }


  /*
   * ==========================================
   * CHECK IF DATE IS TODAY
   * ==========================================
   */

  function isToday(day) {

    return (
      day ===
        today.getDate() &&

      month ===
        today.getMonth() &&

      year ===
        today.getFullYear()
    );

  }


  /*
   * ==========================================
   * SELECT DATE
   * ==========================================
   */

  function handleSelectDay(day) {

    setSelectedDay(
      day
    );


    setNewTask(
      ""
    );


    setNewTaskCategory(
      "workout"
    );

  }


  /*
   * ==========================================
   * ADD TASK
   * ==========================================
   */

  async function handleAddTask() {

    const trimmedTask =
      newTask.trim();


    if (
      trimmedTask === ""
    ) {

      return;

    }


    if (
      !selectedDateKey
    ) {

      return;

    }


    const task = {

      id:
        Date.now(),

      title:
        trimmedTask,

      category:
        newTaskCategory,

      completed:
        false,

    };


    /*
     * Save locally first.
     */

    setTasks(
      (previous) => {

        const updatedTasks = {

          ...previous,

          [selectedDateKey]: [

            ...(previous[
              selectedDateKey
            ] || []),

            task,

          ],

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );


    /*
     * Save to MySQL.
     */

    const databaseId =
      await saveTaskToDatabase(
        task,
        selectedDateKey
      );


    /*
     * Store the MySQL ID
     * inside the local task.
     */

    if (databaseId) {

      setTasks(
        (previous) => {

          const updatedTasks = {

            ...previous,

            [selectedDateKey]:
              (
                previous[
                  selectedDateKey
                ] || []
              ).map(
                (existingTask) =>
                  existingTask.id ===
                  task.id
                    ? {
                        ...existingTask,
                        dbId:
                          databaseId,
                      }
                    : existingTask
              ),

          };


          savePlannerTasks(
            updatedTasks
          );


          return updatedTasks;

        }
      );

    }


    setNewTask(
      ""
    );


    setNewTaskCategory(
      "workout"
    );

  }


  /*
   * ==========================================
   * TOGGLE TASK
   * ==========================================
   */

  async function handleToggleTask(
    taskId
  ) {

    const taskToUpdate =
      selectedTasks.find(
        (task) =>
          task.id === taskId
      );


    if (!taskToUpdate) {
      return;
    }


    const updatedTask = {

      ...taskToUpdate,

      completed:
        !taskToUpdate.completed,

    };


    setTasks(
      (previous) => {

        const updatedTasks = {

          ...previous,

          [selectedDateKey]:

            (
              previous[
                selectedDateKey
              ] || []
            ).map(
              (task) =>
                task.id === taskId

                  ? updatedTask

                  : task
            ),

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );


    await updateTaskInDatabase(
      updatedTask
    );

  }


  /*
   * ==========================================
   * DELETE TASK
   * ==========================================
   */

  async function handleDeleteTask(
    taskId
  ) {

    const taskToDelete =
      selectedTasks.find(
        (task) =>
          task.id === taskId
      );


    if (!taskToDelete) {
      return;
    }


    setTasks(
      (previous) => {

        const updatedTasks = {

          ...previous,

          [selectedDateKey]:

            (
              previous[
                selectedDateKey
              ] || []
            ).filter(
              (task) =>
                task.id !== taskId
            ),

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );


    await deleteTaskFromDatabase(
      taskToDelete
    );

  }


  /*
   * ==========================================
   * EDIT TASK
   * ==========================================
   */

  async function handleEditTask(
    taskId,
    newTitle,
    newCategory
  ) {

    const updatedTaskContainer = {
      task: null,
    };


    setTasks(
      (previous) => {

        const updatedTasks = {

          ...previous,

          [selectedDateKey]:

            (
              previous[
                selectedDateKey
              ] || []
            ).map(
              (task) => {

                if (
                  task.id !== taskId
                ) {

                  return task;

                }


                const updatedTask = {

                  ...task,

                  title:
                    newTitle,

                  category:
                    newCategory,

                };


                updatedTaskContainer.task =
                  updatedTask;


                return updatedTask;

              }
            ),

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );


    if (
      updatedTaskContainer.task
    ) {

      await updateTaskInDatabase(
        updatedTaskContainer.task
      );

    }

  }


  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (

    <section
      className="calendar-container"
    >


      {/* ====================================
          CALENDAR HEADER
      ==================================== */}

      <div
        className="calendar-header"
      >

        <button
          onClick={
            goToPreviousMonth
          }
        >
          ←
        </button>


        <h2>
          {monthName} {year}
        </h2>


        <button
          onClick={
            goToNextMonth
          }
        >
          →
        </button>

      </div>


      {/* ====================================
          MONTHLY PROGRESS
      ==================================== */}

      <PlannerProgress
        tasks={
          currentMonthTasks
        }

        monthName={
          monthName
        }

        year={
          year
        }
      />


      {/* ====================================
          ACTIVITY STATISTICS
      ==================================== */}

      <PlannerStats
        tasks={
          currentMonthTasks
        }
      />


      {/* ====================================
          WEEKDAYS
      ==================================== */}

      <div
        className="calendar-weekdays"
      >

        <span>
          Sun
        </span>

        <span>
          Mon
        </span>

        <span>
          Tue
        </span>

        <span>
          Wed
        </span>

        <span>
          Thu
        </span>

        <span>
          Fri
        </span>

        <span>
          Sat
        </span>

      </div>


      {/* ====================================
          CALENDAR GRID
      ==================================== */}

      <div
        className="calendar-grid"
      >

        {/* Empty spaces */}

        {Array.from({
          length: firstDay,
        }).map(
          (_, index) => (

            <div
              className="calendar-empty"
              key={
                `empty-${index}`
              }
            ></div>

          )
        )}


        {/* Calendar Days */}

        {Array.from({
          length:
            daysInMonth,
        }).map(
          (_, index) => {

            const day =
              index + 1;


            const dateKey =
              getDateKey(
                day
              );


            const dayTasks =
              tasks[
                dateKey
              ] || [];


            const taskCount =
              dayTasks.length;


            const completedTaskCount =
              dayTasks.filter(
                (task) =>
                  task.completed
              ).length;


            return (

              <CalendarDay

                key={
                  day
                }

                day={
                  day
                }

                isToday={
                  isToday(day)
                }

                isSelected={
                  selectedDay === day
                }

                onSelect={
                  handleSelectDay
                }

                taskCount={
                  taskCount
                }

                completedTaskCount={
                  completedTaskCount
                }

              />

            );

          }
        )}

      </div>


      {/* ====================================
          SELECTED DATE
      ==================================== */}

      {selectedDay && (

        <div
          className="selected-date"
        >

          <h3>
            Selected Date
          </h3>


          <p>
            {monthName}{" "}
            {selectedDay},{" "}
            {year}
          </p>

        </div>

      )}


      {/* ====================================
          TASKS
      ==================================== */}

      {selectedDay && (

        <TaskList

          tasks={
            selectedTasks
          }

          newTask={
            newTask
          }

          newTaskCategory={
            newTaskCategory
          }

          onNewTaskChange={
            setNewTask
          }

          onNewTaskCategoryChange={
            setNewTaskCategory
          }

          onAddTask={
            handleAddTask
          }

          onToggleTask={
            handleToggleTask
          }

          onDeleteTask={
            handleDeleteTask
          }

          onEditTask={
            handleEditTask
          }

        />

      )}

    </section>

  );

}


export default Calendar;