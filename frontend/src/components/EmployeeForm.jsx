import { useEffect, useState } from "react";

const initialForm = {
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    job_title: "",
    status: "Active"
};

function EmployeeForm({
    selectedEmployee,
    onSubmit,
    onCancel
}) {

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (selectedEmployee) {
            setForm(selectedEmployee);
        } else {
            setForm(initialForm);
        }

    }, [selectedEmployee]);


    function handleChange(event) {

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }


    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(form);

        setForm(initialForm);
    }


    return (

        <form
            className="employee-form"
            onSubmit={handleSubmit}
        >

            <h2>
                {selectedEmployee
                    ? "Edit Employee"
                    : "Add Employee"}
            </h2>


            {!selectedEmployee && (

                <div className="form-group">

                    <label>
                        Employee ID
                    </label>

                    <input
                        name="employee_id"
                        value={form.employee_id}
                        onChange={handleChange}
                        required
                    />

                </div>

            )}


            <div className="form-row">

                <div className="form-group">

                    <label>
                        First Name
                    </label>

                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Last Name
                    </label>

                    <input
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        required
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

            </div>


            <div className="form-group">

                <label>
                    Phone
                </label>

                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Department
                    </label>

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

                </div>


                <div className="form-group">

                    <label>
                        Job Title
                    </label>

                    <input
                        name="job_title"
                        value={form.job_title}
                        onChange={handleChange}
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Status
                </label>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            <div className="form-actions">

                <button type="submit">
                    {selectedEmployee
                        ? "Update Employee"
                        : "Add Employee"}
                </button>


                {selectedEmployee && (

                    <button
                        type="button"
                        className="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>
    );
}

export default EmployeeForm;