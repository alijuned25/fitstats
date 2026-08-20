const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const aiRoutes = require("./routes/ai");

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
   ROOT ROUTE
   ========================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FitStats API",
    status: "running",
  });
});


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
   AI ROUTES
   ========================================== */

app.use("/api/ai", aiRoutes);


/* ==========================================
   START SERVER
   ========================================== */

app.listen(PORT, () => {
  console.log(
    `FitStats backend running on http://localhost:${PORT}`
  );
});

