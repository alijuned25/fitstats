import {
  Link,
  useLocation,
} from "react-router-dom";


function Sidebar({
  isOpen,
  onToggle,
  theme,
  onThemeToggle,
}) {

  const location =
    useLocation();


  function isActive(path) {

    return (
      location.pathname === path
    );

  }


  return (

    <>

      {/* ======================================
          MOBILE MENU BUTTON
      ====================================== */}

      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label="Toggle navigation"
      >
        ☰
      </button>


      {/* ======================================
          OVERLAY
      ====================================== */}

      {isOpen && (

        <div
          className="sidebar-overlay"
          onClick={onToggle}
        ></div>

      )}


      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`sidebar ${
          isOpen
            ? "sidebar-open"
            : ""
        }`}
      >


        {/* ====================================
            HEADER
        ==================================== */}

        <div className="sidebar-header">

          <div className="sidebar-logo">
            FitStats
          </div>


          <button
            className="sidebar-close"
            onClick={onToggle}
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>


        {/* ====================================
            NAVIGATION
        ==================================== */}

        <nav className="sidebar-nav">

          <p className="sidebar-section-title">
            MENU
          </p>


          <ul>

            {/* Dashboard */}

            <li>

              <Link
                to="/dashboard"
                className={
                  isActive("/dashboard")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  🏠
                </span>

                <span>
                  Dashboard
                </span>

              </Link>

            </li>


            {/* Workout */}

            <li>

              <Link
                to="/workout"
                className={
                  isActive("/workout")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  🏋️
                </span>

                <span>
                  Workout
                </span>

              </Link>

            </li>


            {/* Planner */}

            <li>

              <Link
                to="/planner"
                className={
                  isActive("/planner")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  📅
                </span>

                <span>
                  Planner
                </span>

              </Link>

            </li>


            {/* Calculator */}

            <li>

              <Link
                to="/calculator"
                className={
                  isActive("/calculator")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  🧮
                </span>

                <span>
                  Calculator
                </span>

              </Link>

            </li>


            {/* Diet */}

            <li>

              <Link
                to="/diet"
                className={
                  isActive("/diet")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  🥗
                </span>

                <span>
                  Diet
                </span>

              </Link>

            </li>


            {/* Sensei */}

            <li>

              <Link
                to="/ai"
                className={
                  isActive("/ai")
                    ? "active"
                    : ""
                }
                onClick={onToggle}
              >

                <span className="nav-icon">
                  ✦
                </span>

                <span>
                  Sensei
                </span>

              </Link>

            </li>

          </ul>

        </nav>


        {/* ====================================
            THEME TOGGLE
        ==================================== */}

        <div className="sidebar-theme-section">

          <div className="sidebar-theme-label">

            <span>
              APPEARANCE
            </span>

          </div>


          <button
            type="button"
            className={`theme-toggle ${
              theme === "dark"
                ? "dark"
                : "light"
            }`}
            onClick={
              onThemeToggle
            }
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >

            <span className="theme-toggle-icon">
              {theme === "dark"
                ? "🌙"
                : "☀️"}
            </span>


            <span className="theme-toggle-text">

              {theme === "dark"
                ? "Dark Mode"
                : "Light Mode"}

            </span>


            <span className="theme-toggle-track">

              <span className="theme-toggle-thumb">
              </span>

            </span>

          </button>

        </div>


      </aside>

    </>

  );

}


export default Sidebar;