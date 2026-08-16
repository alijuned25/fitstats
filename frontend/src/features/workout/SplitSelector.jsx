function SplitSelector({ onSelectSplit }) {
  return (
    <section className="split-selector">
      <h2>Choose Your Workout Split</h2>

      <p className="split-description">
        Select how many days you want to train each week.
      </p>

      <div className="split-buttons">
        <button onClick={() => onSelectSplit(3)}>
          3 Days
        </button>

        <button onClick={() => onSelectSplit(4)}>
          4 Days
        </button>

        <button onClick={() => onSelectSplit(5)}>
          5 Days
        </button>

        <button onClick={() => onSelectSplit(6)}>
          6 Days
        </button>
      </div>
    </section>
  );
}

export default SplitSelector;