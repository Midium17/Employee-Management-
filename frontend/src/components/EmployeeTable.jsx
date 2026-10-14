
import { useState } from "react";

function EmployeeTable({
  employees,
  loading,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const text = [
      employee.employee_id,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.department,
      employee.job_title,
      employee.status,
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <section className="panel">
      <div className="list-header">
        <div>
          <h2>Employee directory</h2>
          <p className="subtitle">
            {filteredEmployees.length} employee(s) displayed
          </p>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search employees..."
          aria-label="Search employees"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="empty-state">Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p className="empty-state">
          {employees.length === 0
            ? "No employees yet."
            : "No employees match your search."}
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.employee_id}</td>
                  <td>
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.department?.name ?? "Unassigned"}</td>
                  <td>{employee.job_title || "—"}</td>
                  <td>
                    <span
                      className={`status ${
                        employee.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        type="button"
                        className="small-button secondary-button"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="small-button danger-button"
                        onClick={() => onDelete(employee)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default EmployeeTable;
