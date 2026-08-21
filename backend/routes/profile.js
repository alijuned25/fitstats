const express = require("express");
const router = express.Router();


// =========================================================
// DATABASE CONNECTION
// =========================================================

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "fitstats",
  port: process.env.DB_PORT || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// =========================================================
// GET FITNESS PROFILE
// GET /api/profile/:userId
// =========================================================

router.get("/:userId", async (req, res) => {

  try {

    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {

      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });

    }


    const [rows] = await pool.execute(
      `
      SELECT
        id,
        user_id,
        age,
        gender,
        height_cm,
        weight_kg,
        activity_level,
        fitness_goal,
        bmi,
        bmr,
        tdee,
        calorie_target,
        created_at
      FROM fitness_profiles
      WHERE user_id = ?
      LIMIT 1
      `,
      [userId]
    );


    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Fitness profile not found.",
      });

    }


    return res.json({
      success: true,
      profile: rows[0],
    });

  }

  catch (error) {

    console.error(
      "Get fitness profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch fitness profile.",
    });

  }

});


// =========================================================
// CREATE / UPDATE FITNESS PROFILE
// POST /api/profile
// =========================================================

router.post("/", async (req, res) => {

  try {

    const {
      user_id,
      age,
      gender,
      height_cm,
      weight_kg,
      activity_level,
      fitness_goal,
      bmi,
      bmr,
      tdee,
      calorie_target,
    } = req.body;


    // -----------------------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------------------

    if (!user_id) {

      return res.status(400).json({
        success: false,
        message: "user_id is required.",
      });

    }


    const numericUserId = Number(user_id);

    if (
      !Number.isInteger(numericUserId) ||
      numericUserId <= 0
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid user_id.",
      });

    }


    // -----------------------------------------------------
    // CHECK WHETHER PROFILE ALREADY EXISTS
    // -----------------------------------------------------

    const [existing] = await pool.execute(
      `
      SELECT id
      FROM fitness_profiles
      WHERE user_id = ?
      LIMIT 1
      `,
      [numericUserId]
    );


    // -----------------------------------------------------
    // UPDATE EXISTING PROFILE
    // -----------------------------------------------------

    if (existing.length > 0) {

      const profileId = existing[0].id;


      await pool.execute(
        `
        UPDATE fitness_profiles
        SET
          age = ?,
          gender = ?,
          height_cm = ?,
          weight_kg = ?,
          activity_level = ?,
          fitness_goal = ?,
          bmi = ?,
          bmr = ?,
          tdee = ?,
          calorie_target = ?
        WHERE id = ?
        `,
        [
          age ?? null,
          gender ?? null,
          height_cm ?? null,
          weight_kg ?? null,
          activity_level ?? null,
          fitness_goal ?? null,
          bmi ?? null,
          bmr ?? null,
          tdee ?? null,
          calorie_target ?? null,
          profileId,
        ]
      );


      return res.json({
        success: true,
        message: "Fitness profile updated successfully.",
        profileId,
      });

    }


    // -----------------------------------------------------
    // CREATE NEW PROFILE
    // -----------------------------------------------------

    const [result] = await pool.execute(
      `
      INSERT INTO fitness_profiles
      (
        user_id,
        age,
        gender,
        height_cm,
        weight_kg,
        activity_level,
        fitness_goal,
        bmi,
        bmr,
        tdee,
        calorie_target
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        numericUserId,
        age ?? null,
        gender ?? null,
        height_cm ?? null,
        weight_kg ?? null,
        activity_level ?? null,
        fitness_goal ?? null,
        bmi ?? null,
        bmr ?? null,
        tdee ?? null,
        calorie_target ?? null,
      ]
    );


    return res.status(201).json({
      success: true,
      message: "Fitness profile created successfully.",
      profileId: result.insertId,
    });

  }

  catch (error) {

    console.error(
      "Save fitness profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to save fitness profile.",
    });

  }

});


module.exports = router;