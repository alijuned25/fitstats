import { useState } from "react";


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

  const today =
    new Date();


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

  function getDateKey(
    day
  ) {

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

  const currentMonthTasks =
    [];


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

  function isToday(
    day
  ) {

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

  function handleSelectDay(
    day
  ) {

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

  function handleAddTask() {

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

  function handleToggleTask(
    taskId
  ) {

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

                  ? {

                      ...task,

                      completed:
                        !task.completed,

                    }

                  : task
            ),

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );

  }


  /*
   * ==========================================
   * DELETE TASK
   * ==========================================
   */

  function handleDeleteTask(
    taskId
  ) {

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

  }


  /*
   * ==========================================
   * EDIT TASK
   * ==========================================
   */

  function handleEditTask(
    taskId,
    newTitle,
    newCategory
  ) {

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

                  ? {

                      ...task,

                      title:
                        newTitle,

                      category:
                        newCategory,

                    }

                  : task
            ),

        };


        savePlannerTasks(
          updatedTasks
        );


        return updatedTasks;

      }
    );

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