
import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">E</div>
          <div>
            <strong>EmployeeHub</strong>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-heading">WORKSPACE</p>

          <NavLink to="/" end className="nav-link">
            <span>▦</span> Dashboard
          </NavLink>

          <NavLink to="/employees" className="nav-link">
            <span>♙</span> Employees
          </NavLink>

          <NavLink to="/departments" className="nav-link">
            <span>▤</span> Departments
          </NavLink>

          <p className="nav-heading">ACCOUNT</p>

          <NavLink to="/login" className="nav-link">
            <span>⇥</span> Login
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          EmployeeHub · Development
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span>Employee Management</span>
          <span className="environment-label">Development</span>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
