import { useState } from "react";

import SplitSelector from "../features/workout/SplitSelector";
import WorkoutSplit from "../features/workout/WorkoutSplit";

function Workout() {
  const [selectedSplit, setSelectedSplit] = useState(null);

  return (
    <main className="workout-page">
      <div className="page-title">
        <h1>Workout</h1>

        <p>
          Build your weekly training routine.
        </p>
      </div>

      <SplitSelector
        onSelectSplit={setSelectedSplit}
      />

      {selectedSplit && (
        <WorkoutSplit
          selectedSplit={selectedSplit}
        />
      )}
    </main>
  );
}

export default Workout;