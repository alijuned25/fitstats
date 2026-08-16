import Calendar from "../features/planner/Calendar";

function Planner() {
  return (
    <main className="planner-page">

      <div className="page-title">

        <h1>
          Monthly Planner
        </h1>

        <p>
          Plan and track your fitness activities.
        </p>

      </div>

      <Calendar />

    </main>
  );
}

export default Planner;