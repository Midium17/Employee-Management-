import { useCallback, useEffect, useState } from "react";

import DepartmentForm from "../components/DepartmentForm";
import DepartmentTable from "../components/DepartmentTable";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";

import "../App.css";

function getApiError(error) {
  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item.msg)
      .join(", ");
  }

  if (!error.response) {
    return "Cannot connect to the server. Check that FastAPI is running.";
  }

  return "Something went wrong. Please try again.";
}

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadDepartments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  async function handleSaveDepartment(formData) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (selectedDepartment) {
        await updateDepartment(
          selectedDepartment.id,
          formData
        );

        setMessage("Department updated successfully.");
      } else {
        await createDepartment(formData);

        setMessage("Department created successfully.");
      }

      setSelectedDepartment(null);

      await loadDepartments();
    } catch (requestError) {
      setError(getApiError(requestError));

      // Allow the form to handle the failed submission.
      throw requestError;
    } finally {
      setSaving(false);
    }
  }

  function handleEditDepartment(department) {
    setSelectedDepartment(department);
    setError("");
    setMessage("");

    // Scroll to the form on smaller screens.
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setSelectedDepartment(null);
    setError("");
    setMessage("");
  }

  async function handleDeleteDepartment(department) {
    const confirmed = window.confirm(
      `Delete the "${department.name}" department?`
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await deleteDepartment(department.id);

      if (selectedDepartment?.id === department.id) {
        setSelectedDepartment(null);
      }

      setMessage("Department deleted successfully.");

      await loadDepartments();
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  }

  return (
    <div className="departments-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ORGANISATION MANAGEMENT</p>
          <h1>Departments</h1>

          <p className="dept-page-subtitle">
            Create and manage departments across your organisation.
          </p>
        </div>

        <div className="dept-total-card">
          <span>Total departments</span>
          <strong>{departments.length}</strong>
        </div>
      </div>

      {error && (
        <div className="notice error" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="notice success" role="status">
          {message}
        </div>
      )}

      <div className="dept-content-grid">
        <DepartmentForm
          department={selectedDepartment}
          onSave={handleSaveDepartment}
          onCancel={handleCancelEdit}
          saving={saving}
        />

        <DepartmentTable
          departments={departments}
          loading={loading}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
        />
      </div>
    </div>
  );
}

export default DepartmentsPage;