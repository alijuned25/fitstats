function ExerciseCard({
  exercise,
  isCompleted,
  weight,
  onWeightChange,
  onComplete,
}) {
  return (
    <div
      className={`exercise-card ${
        isCompleted ? "completed" : ""
      }`}
    >

      <div className="exercise-info">

        <h4>{exercise.name}</h4>

        <div className="exercise-details">

          <span>
            <strong>{exercise.sets}</strong>
            <small>Sets</small>
          </span>

          <span>
            <strong>{exercise.reps}</strong>
            <small>Reps</small>
          </span>

          <span>
            <strong>{exercise.rest}s</strong>
            <small>Rest</small>
          </span>

        </div>

        <div className="weight-input">

          <label>
            Weight (kg)
          </label>

          <input
            type="number"
            min="0"
            value={weight}
            onChange={(event) =>
              onWeightChange(event.target.value)
            }
            placeholder="Enter weight"
          />

        </div>

      </div>

      <button
        className="complete-button"
        onClick={onComplete}
        disabled={isCompleted}
      >
        {isCompleted
          ? "✓ Completed"
          : "Complete"}
      </button>

    </div>
  );
}

export default ExerciseCard;