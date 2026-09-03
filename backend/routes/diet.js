const express = require("express");
const db = require("../config/db");

const router = express.Router();


/*
 * ==========================================
 * SAVE DIET PREFERENCE
 * ==========================================
 *
 * POST /api/diet
 */

router.post("/", async (req, res) => {

  try {

    const {
      user_id,
      diet_type,
      allergies,
      disliked_foods,
    } = req.body;


    /*
     * Validate required fields.
     */

    if (!user_id || !diet_type) {

      return res.status(400).json({
        success: false,
        message:
          "user_id and diet_type are required.",
      });

    }


    /*
     * Check whether the user already
     * has a diet preference.
     */

    const [existingRows] =
      await db.query(
        `
        SELECT id
        FROM diet_preferences
        WHERE user_id = ?
        LIMIT 1
        `,
        [user_id]
      );


    /*
     * If preference exists, update it.
     */

    if (existingRows.length > 0) {

      const preferenceId =
        existingRows[0].id;


      await db.query(
        `
        UPDATE diet_preferences
        SET
          diet_type = ?,
          allergies = ?,
          disliked_foods = ?
        WHERE id = ?
        `,
        [
          diet_type,
          allergies || "",
          disliked_foods || "",
          preferenceId,
        ]
      );


      return res.json({

        success: true,

        message:
          "Diet preference updated successfully.",

        preferenceId,

      });

    }


    /*
     * Otherwise create a new preference.
     */

    const [result] =
      await db.query(
        `
        INSERT INTO diet_preferences
        (
          user_id,
          diet_type,
          allergies,
          disliked_foods
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          user_id,
          diet_type,
          allergies || "",
          disliked_foods || "",
        ]
      );


    res.status(201).json({

      success: true,

      message:
        "Diet preference saved successfully.",

      preferenceId:
        result.insertId,

    });


  } catch (error) {

    console.error(
      "Diet preference error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to save diet preference.",

    });

  }

});


/*
 * ==========================================
 * GET DIET PREFERENCE
 * ==========================================
 *
 * GET /api/diet/:userId
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
          diet_type,
          allergies,
          disliked_foods,
          created_at
        FROM diet_preferences
        WHERE user_id = ?
        LIMIT 1
        `,
        [userId]
      );


    if (rows.length === 0) {

      return res.status(404).json({

        success: false,

        message:
          "Diet preference not found.",

      });

    }


    res.json({

      success: true,

      preference:
        rows[0],

    });


  } catch (error) {

    console.error(
      "Get diet preference error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Unable to fetch diet preference.",

    });

  }

});


module.exports = router;