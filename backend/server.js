const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const aiRoutes = require("./routes/ai");
const profileRoutes = require("./routes/profile");
const dietRoutes = require("./routes/diet");
const workoutRoutes = require("./routes/workout");
const plannerRoutes = require("./routes/planner");
const db = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;


/* ==========================================
   MIDDLEWARE
   ========================================== */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());


/* ==========================================
   HEALTH CHECK
   ========================================== */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FitStats backend is running.",
  });
});


/* ==========================================
   DATABASE HEALTH CHECK
   ========================================== */

app.get("/api/db/health", async (req, res) => {
  try {
    const connection = await db.getConnection();

    await connection.query("SELECT 1");

    connection.release();

    res.json({
      success: true,
      message: "MySQL connected successfully.",
    });

  } catch (error) {
    console.error("MySQL connection error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to connect to MySQL.",
    });
  }
});


/* ==========================================
   API ROUTES
   ========================================== */

app.use("/api/ai", aiRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/diet", dietRoutes);

app.use("/api/workout", workoutRoutes);

app.use("/api/planner", plannerRoutes);


/* ==========================================
   START SERVER
   ========================================== */

app.listen(PORT, () => {
  console.log(
    `FitStats backend running on http://localhost:${PORT}`
  );
});