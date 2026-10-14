import { useEffect, useState } from "react";

const emptyForm = {
  employee_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  department: "",
  job_title: "",
  status: "Active",
  hire_date: "",
};

function EmployeeForm({
  employee,
  onSave,
  onCancel,
  saving,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (employee) {
      setForm({
        employee_id: employee.employee_id ?? "",
        first_name: employee.first_name ?? "",
        last_name: employee.last_name ?? "",
        email: employee.email ?? "",
        phone: employee.phone ?? "",
        department: employee.department ?? "",
        job_title: employee.job_title ?? "",
        status: employee.status ?? "Active",
        hire_date: employee.hire_date ?? "",
      });
    } else {
      setForm({ ...emptyForm });
    }
  }, [employee]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      hire_date: form.hire_date || null,
      phone: form.phone || null,
      department: form.department || null,
      job_title: form.job_title || null,
    };

    onSave(payload);
    
    // Clear form inputs back to blank after submit (only runs if un-controlled or ready for new entry)
    setForm(emptyForm);
  }

  return (
    <section className="panel">
      <h2>{employee ? "Edit employee" : "Add employee"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Employee ID *
            <input
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              required
              maxLength={50}
              disabled={Boolean(employee)}
            />
          </label>

          <label>
            First name *
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </label>

          <label>
            Last name *
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              maxLength={150}
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              maxLength={30}
            />
          </label>

          <label>
            Department
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">
                Select Department
              </option>
              <option value="IT">
                IT
              </option>
              <option value="HR">
                HR
              </option>
              <option value="Finance">
                Finance
              </option>
              <option value="Sales">
                Sales
              </option>
              <option value="Operations">
                Operations
              </option>
            </select>
          </label>

          <label>
            Job title
            <input
              name="job_title"
              value={form.job_title}
              onChange={handleChange}
              maxLength={100}
            />
          </label>

          <label>
            Hire date
            <input
              type="date"
              name="hire_date"
              value={form.hire_date}
              onChange={handleChange}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : employee
                ? "Update employee"
                : "Add employee"}
          </button>

          {employee && (
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;