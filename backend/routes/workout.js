const express = require("express");
const db = require("../config/db");

const router = express.Router();


/*
 * ==========================================
 * SAVE WORKOUT PROGRESS
 * ==========================================
 *
 * POST /api/workout
 */

router.post("/", async (req, res) => {

  try {

    const {
      user_id,
      workout_day,
      workout_name,
      exercise_name,
      sets,
      reps,
      completed,
    } = req.body;


    /*
     * Validate required fields.
     */

    if (
      !user_id ||
      !workout_day ||
      !workout_name ||
      !exercise_name
    ) {

      return res.status(400).json({
        success: false,
        message:
          "user_id, workout_day, workout_name and exercise_name are required.",
      });

    }


    /*
     * Check whether this exercise
     * already exists for this user.
     */

    const [existingRows] =
      await db.query(
        `
        SELECT id
        FROM workout_progress
        WHERE user_id = ?
          AND workout_day = ?
          AND workout_name = ?
          AND exercise_name = ?
        LIMIT 1
        `,
        [
          user_id,
          workout_day,
          workout_name,
          exercise_name,
        ]
      );


    /*
     * If the exercise already exists,
     * update its completion status.
     */

    if (existingRows.length > 0) {

      const progressId =
        existingRows[0].id;


      await db.query(
        `
        UPDATE workout_progress
        SET
          sets = ?,
          reps = ?,
          completed = ?,
          completed_at = ?
        WHERE id = ?
        `,
        [
          sets || 0,
          reps || 0,
          completed ? true : false,
          completed ? new Date() : null,
          progressId,
        ]
      );


      return res.json({

        success: true,

        message:
          "Workout progress updated successfully.",

        progressId,

      });

    }


    /*
     * Otherwise create a new record.
     */

    const [result] =
      await db.query(
        `
        INSERT INTO workout_progress
        (
          user_id,
          workout_day,
          workout_name,
          exercise_name,
          sets,
          reps,
          completed,
          completed_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          user_id,
          workout_day,
          workout_name,
          exercise_name,
          sets || 0,
          reps || 0,
          completed ? true : false,
          completed ? new Date() : null,
        ]
      );


    res.status(201).json({

      success: true,

      message:
        "Workout progress saved successfully.",

      progressId:
        result.insertId,

    });


  } catch (error) {

    console.error(
      "Workout progress error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to save workout progress.",

    });

  }

});


/*
 * ==========================================
 * GET WORKOUT PROGRESS
 * ==========================================
 *
 * GET /api/workout/:userId
 */

router.get("/:userId", async (req, res) => {

  try {

    const {
      userId,
    } = req.params;


    const [rows] =
      await db.query(
        `
        SELECT
          id,
          user_id,
          workout_day,
          workout_name,
          exercise_name,
          sets,
          reps,
          completed,
          completed_at,
          created_at
        FROM workout_progress
        WHERE user_id = ?
        ORDER BY workout_day, id
        `,
        [userId]
      );


    res.json({

      success: true,

      progress:
        rows,

    });


  } catch (error) {

    console.error(
      "Get workout progress error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to fetch workout progress.",

    });

  }

});


module.exports = router;