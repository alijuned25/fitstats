import { useState } from "react";

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

function TaskList({
  tasks,
  newTask,
  newTaskCategory,
  onNewTaskChange,
  onNewTaskCategoryChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  const [editingTaskId, setEditingTaskId] =
    useState(null);

  const [editingTitle, setEditingTitle] =
    useState("");

  const [editingCategory, setEditingCategory] =
    useState("personal");


  function getCategoryInfo(category) {
    return (
      taskCategories.find(
        (item) => item.value === category
      ) || taskCategories[4]
    );
  }


  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingCategory(
      task.category || "personal"
    );
  }


  function cancelEditing() {
    setEditingTaskId(null);
    setEditingTitle("");
    setEditingCategory("personal");
  }


  function saveEditing(taskId) {
    const trimmedTitle =
      editingTitle.trim();

    if (trimmedTitle === "") {
      return;
    }

    onEditTask(
      taskId,
      trimmedTitle,
      editingCategory
    );

    cancelEditing();
  }


  return (
    <section className="task-container">

      {/* =========================
          TASK HEADER
      ========================= */}

      <div className="task-header">

        <div>
          <h3>Daily Tasks</h3>

          <p>
            Stay consistent with your daily goals
          </p>
        </div>

        <div className="task-count">

          <strong>
            {tasks.length}
          </strong>

          <span>
            {tasks.length === 1
              ? "Task"
              : "Tasks"}
          </span>

        </div>

      </div>


      {/* =========================
          ADD TASK
      ========================= */}

      <div className="add-task-card">

        <div className="add-task-title">
          Add a new task
        </div>


        <div className="add-task-input-row">

          <input
            type="text"
            value={newTask}
            onChange={(event) =>
              onNewTaskChange(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onAddTask();
              }
            }}
            placeholder="What do you want to accomplish?"
          />

          <button
            className="add-task-button"
            onClick={onAddTask}
          >
            <span>+</span>
            Add Task
          </button>

        </div>


        {/* Category Selection */}

        <div className="category-section">

          <span className="category-label">
            Category
          </span>

          <div className="category-options">

            {taskCategories.map(
              (category) => (

                <button
                  key={category.value}
                  type="button"
                  className={`category-option ${
                    newTaskCategory ===
                    category.value
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    onNewTaskCategoryChange(
                      category.value
                    )
                  }
                >

                  <span className="category-icon">
                    {category.icon}
                  </span>

                  <span>
                    {category.label}
                  </span>

                </button>

              )
            )}

          </div>

        </div>

      </div>


      {/* =========================
          TASK LIST
      ========================= */}

      {tasks.length === 0 ? (

        <div className="empty-task-state">

          <div className="empty-task-icon">
            ✓
          </div>

          <h4>
            No tasks yet
          </h4>

          <p>
            Add a task above to start planning
            your day.
          </p>

        </div>

      ) : (

        <div className="task-list">

          {tasks.map((task) => {

            const category =
              getCategoryInfo(
                task.category
              );

            return (

              <div
                className={`task-item ${
                  task.completed
                    ? "task-completed"
                    : ""
                }`}
                key={task.id}
              >

                {editingTaskId ===
                task.id ? (

                  /* =========================
                     EDIT MODE
                  ========================= */

                  <div className="edit-task">

                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(event) =>
                        setEditingTitle(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {

                        if (
                          event.key ===
                          "Enter"
                        ) {
                          saveEditing(
                            task.id
                          );
                        }

                        if (
                          event.key ===
                          "Escape"
                        ) {
                          cancelEditing();
                        }

                      }}
                      autoFocus
                    />


                    <div className="edit-category-options">

                      {taskCategories.map(
                        (item) => (

                          <button
                            key={item.value}
                            type="button"
                            className={`edit-category-button ${
                              editingCategory ===
                              item.value
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setEditingCategory(
                                item.value
                              )
                            }
                          >
                            {item.icon}
                            {" "}
                            {item.label}
                          </button>

                        )
                      )}

                    </div>


                    <div className="edit-actions">

                      <button
                        className="save-task"
                        onClick={() =>
                          saveEditing(
                            task.id
                          )
                        }
                      >
                        Save
                      </button>

                      <button
                        className="cancel-task"
                        onClick={
                          cancelEditing
                        }
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  /* =========================
                     NORMAL MODE
                  ========================= */

                  <>

                    <div className="task-main">

                      <label className="task-checkbox">

                        <input
                          type="checkbox"
                          checked={
                            task.completed
                          }
                          onChange={() =>
                            onToggleTask(
                              task.id
                            )
                          }
                        />

                        <span className="custom-checkbox">
                          {task.completed
                            ? "✓"
                            : ""}
                        </span>

                      </label>


                      <div className="task-details">

                        <span className="task-title">
                          {task.title}
                        </span>

                        <span
                          className={`task-category-badge category-${category.value}`}
                        >
                          <span>
                            {category.icon}
                          </span>

                          {category.label}
                        </span>

                      </div>

                    </div>


                    <div className="task-actions">

                      <button
                        className="edit-task-button"
                        onClick={() =>
                          startEditing(
                            task
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-task"
                        onClick={() =>
                          onDeleteTask(
                            task.id
                          )
                        }
                        aria-label="Delete task"
                      >
                        ×
                      </button>

                    </div>

                  </>

                )}

              </div>

            );
          })}

        </div>

      )}

    </section>
  );
}

export default TaskList;