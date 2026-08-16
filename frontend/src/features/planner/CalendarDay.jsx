function CalendarDay({
  day,
  isToday,
  isSelected,
  onSelect,
  taskCount,
  completedTaskCount,
}) {
  return (
    <button
      className={`calendar-day ${
        isToday ? "today" : ""
      } ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(day)}
    >
      <span className="calendar-day-number">
        {day}
      </span>

      {taskCount > 0 && (
        <span className="calendar-task-info">
          {completedTaskCount === taskCount
            ? `✓ ${completedTaskCount}/${taskCount}`
            : `● ${taskCount} ${
                taskCount === 1
                  ? "task"
                  : "tasks"
              }`}
        </span>
      )}
    </button>
  );
}

export default CalendarDay;