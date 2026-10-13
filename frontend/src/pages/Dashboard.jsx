
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees } from "../services/employeeService";
import "../App.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch {
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const activeCount = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveCount = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            An overview of your employee records.
          </p>
        </div>

        <Link to="/employees" className="primary-link">
          Manage employees
        </Link>
      </div>

      {error && <div className="notice error">{error}</div>}

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total employees</span>
          <strong>{employees.length}</strong>
          <p>All registered employees</p>
        </article>

        <article className="stat-card">
          <span>Active employees</span>
          <strong>{activeCount}</strong>
          <p>Currently marked active</p>
        </article>

        <article className="stat-card">
          <span>Inactive employees</span>
          <strong>{inactiveCount}</strong>
          <p>Currently marked inactive</p>
        </article>
      </div>

      <section className="panel dashboard-welcome">
        <h2>Welcome to EmployeeHub</h2>
        <p className="subtitle">
          Use the navigation menu to manage employee records.
          Dashboard figures are calculated from your API response.
        </p>

        <Link to="/employees" className="primary-link">
          View employee directory
        </Link>
      </section>
    </section>
  );
}

export default Dashboard;
