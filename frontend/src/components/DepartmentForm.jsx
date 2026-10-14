import { useEffect, useState } from "react";

function DepartmentForm({
  department,
  onSave,
  onCancel,
  saving,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const isEditing = Boolean(department);

  // Populate the form when editing a department.
  // Clear it when creating a new department.
  useEffect(() => {
    setName(department?.name ?? "");
    setDescription(department?.description ?? "");
    setValidationError("");
  }, [department]);

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationError("");

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setValidationError(
        "Department name must contain at least 2 characters."
      );
      return;
    }

    try {
      await onSave({
        name: trimmedName,
        description: description.trim() || null,
      });
    } catch {
      // The parent page displays API errors.
    }
  }

  return (
    <section className="panel dept-form-panel">
      <div className="dept-panel-heading">
        <div>
          <p className="eyebrow">
            {isEditing ? "UPDATE RECORD" : "NEW RECORD"}
          </p>

          <h2>
            {isEditing ? "Edit Department" : "Add Department"}
          </h2>

          <p className="dept-muted">
            {isEditing
              ? "Update the department details below."
              : "Create a department for your organisation."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="dept-form-fields">
          <div className="dept-field">
            <label htmlFor="department-name">
              Department Name <span>*</span>
            </label>

            <input
              id="department-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Information Technology"
              maxLength={100}
              required
              disabled={saving}
            />
          </div>

          <div className="dept-field">
            <label htmlFor="department-description">
              Description
            </label>

            <textarea
              id="department-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe the department's responsibilities..."
              rows={4}
              maxLength={500}
              disabled={saving}
            />

            <small>
              {description.length}/500 characters
            </small>
          </div>
        </div>

        {validationError && (
          <p className="error" role="alert">
            {validationError}
          </p>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Department"}
          </button>

          {isEditing && (
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

export default DepartmentForm;