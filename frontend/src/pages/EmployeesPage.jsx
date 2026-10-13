
import { useEffect, useState } from "react";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import "../App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadEmployees() {
    setLoading(true);

    try {
      const data = await getEmployees();
      setEmployees(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not load employees. Check the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleSave(payload) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (selectedEmployee) {
        const { employee_id, ...updates } = payload;

        await updateEmployee(selectedEmployee.id, updates);
        setMessage("Employee updated successfully.");
      } else {
        await createEmployee(payload);
        setMessage("Employee created successfully.");
      }

      setSelectedEmployee(null);
      await loadEmployees();
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : detail || "Could not save employee."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(employee) {
    const confirmed = window.confirm(
      `Delete ${employee.first_name} ${employee.last_name}?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteEmployee(employee.id);

      if (selectedEmployee?.id === employee.id) {
        setSelectedEmployee(null);
      }

      setMessage("Employee deleted successfully.");
      await loadEmployees();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not delete employee."
      );
    }
  }

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>Employees</h1>
          <p className="subtitle">
            Manage your employee records in one place.
          </p>
        </div>

        <div className="employee-count">
          <span>Total employees</span>
          <strong>{employees.length}</strong>
        </div>
      </header>

      {error && <div className="notice error">{error}</div>}
      {message && <div className="notice success">{message}</div>}

      <EmployeeForm
        employee={selectedEmployee}
        onSave={handleSave}
        onCancel={() => setSelectedEmployee(null)}
        saving={saving}
      />

      <EmployeeTable
        employees={employees}
        loading={loading}
        onEdit={setSelectedEmployee}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;
