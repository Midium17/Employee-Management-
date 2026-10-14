import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";

function EmployeeForm({ employee, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department_id: "",
    job_title: "",
    status: "Active",
    hire_date: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [departmentError, setDepartmentError] = useState("");
  const [formError, setFormError] = useState("");

  // Load departments from the backend.
  useEffect(() => {
    async function loadDepartments() {
      try {
        setDepartmentError("");

        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to load departments:", error);

        setDepartmentError(
          "Could not load departments. Please check that the backend is running."
        );
      } finally {
        setLoadingDepartments(false);
      }
    }

    loadDepartments();
  }, []);

  // Populate the form when editing an existing employee.
  useEffect(() => {
    if (employee) {
      setFormData({
        employee_id: employee.employee_id ?? "",
        first_name: employee.first_name ?? "",
        last_name: employee.last_name ?? "",
        email: employee.email ?? "",
        phone: employee.phone ?? "",
        department_id:
          employee.department_id != null
            ? String(employee.department_id)
            : employee.department?.id != null
              ? String(employee.department.id)
              : "",
        job_title: employee.job_title ?? "",
        status: employee.status ?? "Active",
        hire_date: employee.hire_date
          ? String(employee.hire_date).slice(0, 10)
          : "",
      });
    } else {
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department_id: "",
        job_title: "",
        status: "Active",
        hire_date: "",
      });
    }

    setFormError("");
  }, [employee]);

  // Update form state when a field changes.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Submit employee data to the backend.
  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const employeeData = {
      ...formData,
      employee_id: formData.employee_id.trim(),
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      department_id: formData.department_id
        ? Number(formData.department_id)
        : null,
      job_title: formData.job_title.trim() || null,
      hire_date: formData.hire_date || null,
    };

    try {
      await onSave(employeeData);
    } catch (error) {
      console.error("Failed to save employee:", error);

      setFormError(
        error.response?.data?.detail ||
          "Could not save the employee. Please check your information and try again."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

      {formError && <p className="error-message">{formError}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="employee_id">Employee ID *</label>
          <input
            id="employee_id"
            name="employee_id"
            type="text"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="e.g. EMP001"
            maxLength={50}
            required
            disabled={saving || Boolean(employee)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="first_name">First Name *</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="e.g. John"
            maxLength={100}
            required
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name *</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="e.g. Doe"
            maxLength={100}
            required
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            maxLength={255}
            required
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +263 77 123 4567"
            maxLength={30}
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department_id">Department</label>

          <select
            id="department_id"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            disabled={saving || loadingDepartments}
          >
            <option value="">
              {loadingDepartments
                ? "Loading departments..."
                : "Unassigned"}
            </option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          {departmentError && (
            <p className="error-message">{departmentError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="job_title">Job Title</label>
          <input
            id="job_title"
            name="job_title"
            type="text"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="e.g. Software Developer"
            maxLength={100}
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={saving}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hire_date">Hire Date</label>
          <input
            id="hire_date"
            name="hire_date"
            type="date"
            value={formData.hire_date}
            onChange={handleChange}
            disabled={saving}
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="primary-button"
          disabled={saving || loadingDepartments}
        >
          {saving
            ? "Saving..."
            : employee
              ? "Update Employee"
              : "Save Employee"}
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;