import { Link, useLocation } from "react-router-dom";

function Sidebar({
  isOpen,
  onToggle,
}) {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <>
      {/* Mobile / Desktop Menu Button */}

      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label="Toggle navigation"
      >
        ☰
      </button>


      {/* Overlay */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onToggle}
        ></div>
      )}


      {/* Sidebar */}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        {/* Header */}

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


        {/* Navigation */}

        <nav className="sidebar-nav">

          <p className="sidebar-section-title">
            MENU
          </p>

          <ul>

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
                  🤖
                </span>

                <span>
                  AI Coach
                </span>
              </Link>
            </li>

          </ul>

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;