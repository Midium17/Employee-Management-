
import "../App.css";

function DepartmentsPage() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ORGANISATION</p>
          <h1>Departments</h1>
          <p className="subtitle">
            Manage your organisation's departments.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>Department management</h2>
        <p className="subtitle">
          This page is a placeholder. Currently, departments
          are stored as text on each employee record.
        </p>
        <p>
          In a later phase, we'll create a separate Department
          database model and API so departments can be managed
          independently.
        </p>
      </div>
    </section>
  );
}

export default DepartmentsPage;
