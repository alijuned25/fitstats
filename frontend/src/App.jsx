import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./features/dashboard/Dashboard";
import Workout from "./features/workout/Workout";
import Calendar from "./features/planner/Calendar";
import Calculator from "./features/calculator/Calculator";
import Diet from "./features/diet/Diet";
import AICoach from "./features/ai/AICoach";


function App() {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);


  function toggleSidebar() {

    setSidebarOpen(
      (previous) => !previous
    );

  }


  return (

    <BrowserRouter>

      <div className="app">

        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />


        <main className="main-content">

          <Routes>

            {/* =========================
                HOME
            ========================= */}

            <Route
              path="/"
              element={
                <div className="page-placeholder">

                  <h1>
                    Welcome to FitStats
                  </h1>

                  <p>
                    Your fitness journey starts here.
                  </p>

                </div>
              }
            />


            {/* =========================
                DASHBOARD
            ========================= */}

            <Route
              path="/dashboard"
              element={
                <Dashboard />
              }
            />


            {/* =========================
                WORKOUT
            ========================= */}

            <Route
              path="/workout"
              element={
                <Workout />
              }
            />


            {/* =========================
                PLANNER
            ========================= */}

            <Route
              path="/planner"
              element={
                <Calendar />
              }
            />


            {/* =========================
                CALCULATOR
            ========================= */}

            <Route
              path="/calculator"
              element={
                <Calculator />
              }
            />


            {/* =========================
                DIET
            ========================= */}

            <Route
              path="/diet"
              element={
                <Diet />
              }
            />


            {/* =========================
                AI COACH
            ========================= */}

            <Route
              path="/ai"
              element={
                <AICoach />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );

}


export default App;
