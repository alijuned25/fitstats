const express = require("express");
const db = require("../config/db");

const router = express.Router();


/* ==========================================
   GET ALL PLANNER TASKS
   ========================================== */

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        id,
        user_id,
        task_name,
        category,
        task_date,
        completed,
        created_at
      FROM planner_tasks
      WHERE user_id = ?
      ORDER BY task_date, id
      `,
      [userId]
    );

    res.json({
      success: true,
      tasks: rows,
    });

  } catch (error) {
    console.error(
      "Get planner tasks error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch planner tasks.",
    });
  }
});


/* ==========================================
   CREATE PLANNER TASK
   ========================================== */

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      task_name,
      category,
      task_date,
      completed,
    } = req.body;

    if (
      !user_id ||
      !task_name ||
      !task_date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "user_id, task_name and task_date are required.",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO planner_tasks
      (
        user_id,
        task_name,
        category,
        task_date,
        completed
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        user_id,
        task_name,
        category || "workout",
        task_date,
        completed ? true : false,
      ]
    );

    res.status(201).json({
      success: true,
      message:
        "Planner task saved successfully.",
      taskId: result.insertId,
    });

  } catch (error) {
    console.error(
      "Create planner task error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to save planner task.",
    });
  }
});


/* ==========================================
   UPDATE PLANNER TASK
   ========================================== */

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      task_name,
      category,
      completed,
    } = req.body;

    if (
      task_name === undefined &&
      category === undefined &&
      completed === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "No update data provided.",
      });
    }

    const [result] = await db.query(
      `
      UPDATE planner_tasks
      SET
        task_name = COALESCE(?, task_name),
        category = COALESCE(?, category),
        completed = COALESCE(?, completed)
      WHERE id = ?
      `,
      [
        task_name ?? null,
        category ?? null,
        completed === undefined
          ? null
          : completed,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Planner task not found.",
      });
    }

    res.json({
      success: true,
      message:
        "Planner task updated successfully.",
    });

  } catch (error) {
    console.error(
      "Update planner task error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update planner task.",
    });
  }
});


/* ==========================================
   DELETE PLANNER TASK
   ========================================== */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM planner_tasks
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Planner task not found.",
      });
    }

    res.json({
      success: true,
      message:
        "Planner task deleted successfully.",
    });

  } catch (error) {
    console.error(
      "Delete planner task error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to delete planner task.",
    });
  }
});


module.exports = router;