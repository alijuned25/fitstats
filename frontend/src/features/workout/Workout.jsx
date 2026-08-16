import { useState } from "react";

import SplitSelector from "./SplitSelector";
import WorkoutSplit from "./WorkoutSplit";

import {
  getSelectedSplit,
  saveSelectedSplit,
} from "./workoutUtils";


function Workout() {

  /*
   * ==========================================
   * SELECTED WORKOUT SPLIT
   * ==========================================
   *
   * Load the previously selected split.
   *
   * If nothing has been saved yet,
   * use the 3-day split.
   */

  const [
    selectedSplit,
    setSelectedSplit,
  ] = useState(
    getSelectedSplit()
  );


  /*
   * ==========================================
   * CHANGE WORKOUT SPLIT
   * ==========================================
   */

  function handleSplitChange(
    split
  ) {

    const numericSplit =
      Number(split);


    /*
     * Only allow workout splits
     * that actually exist in
     * workoutData.js.
     */

    const validSplits = [
      3,
      4,
      5,
      6,
    ];


    if (
      !validSplits.includes(
        numericSplit
      )
    ) {

      return;

    }


    setSelectedSplit(
      numericSplit
    );


    /*
     * Persist the selected split.
     */

    saveSelectedSplit(
      numericSplit
    );

  }


  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (

    <main className="workout-page">


      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="workout-page-header">

        <div>

          <span className="workout-eyebrow">
            FITSTATS WORKOUT
          </span>


          <h1>
            Workout Plans
          </h1>


          <p>
            Choose your workout split and
            start tracking your progress.
          </p>

        </div>

      </div>


      {/* ======================================
          WORKOUT SPLIT SELECTOR
      ====================================== */}

      <SplitSelector
        onSelectSplit={
          handleSplitChange
        }
      />


      {/* ======================================
          WORKOUT PLAN
      ====================================== */}

      <WorkoutSplit
        selectedSplit={
          selectedSplit
        }
      />


    </main>

  );

}


export default Workout;