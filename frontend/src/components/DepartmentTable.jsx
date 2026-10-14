import { useState } from "react";

function DepartmentTable({
  departments,
  loading,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredDepartments = departments.filter((department) => {
    const searchText = search.toLowerCase();

    return (
      department.name.toLowerCase().includes(searchText) ||
      (department.description ?? "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <section className="panel dept-table-panel">
      <div className="dept-list-header">
        <div>
          <p className="eyebrow">ORGANISATION</p>
          <h2>All Departments</h2>
          <p className="dept-muted">
            Manage the departments in your organisation.
          </p>
        </div>

        <input
          type="search"
          className="search-input dept-search"
          placeholder="Search departments..."
          aria-label="Search departments"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <div className="dept-state">
          <p>Loading departments...</p>
        </div>
      ) : filteredDepartments.length === 0 ? (
        <div className="dept-state">
          <h3>
            {departments.length === 0
              ? "No departments yet"
              : "No matching departments"}
          </h3>

          <p>
            {departments.length === 0
              ? "Create your first department using the form."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="dept-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Description</th>
                <th className="dept-actions-heading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((department) => (
                <tr key={department.id}>
                  <td>
                    <div className="dept-name-cell">
                      <span className="dept-icon">
                        {department.name
                          .charAt(0)
                          .toUpperCase()}
                      </span>

                      <div>
                        <strong>{department.name}</strong>
                        <small>ID: {department.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    {department.description || (
                      <span className="dept-muted">
                        No description
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="dept-actions">
                      <button
                        type="button"
                        className="small-button"
                        onClick={() => onEdit(department)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="small-button danger-button"
                        onClick={() => onDelete(department)}
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

      <div className="dept-table-footer">
        Showing {filteredDepartments.length} of{" "}
        {departments.length} departments
      </div>
    </section>
  );
}

export default DepartmentTable;