import { useEffect, useState } from "react";

import api from "../services/api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";


function Employees() {

    const [employees, setEmployees] = useState([]);

    const [selectedEmployee, setSelectedEmployee] =
        useState(null);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] =
        useState(false);


    async function loadEmployees() {

        try {

            const response =
                await api.get("/employees/");

            setEmployees(response.data);

        } catch (error) {

            console.error(
                "Failed to load employees:",
                error
            );

        }
    }


    useEffect(() => {

        loadEmployees();

    }, []);


    async function handleSubmit(employee) {

        try {

            if (selectedEmployee) {

                await api.patch(
                    `/employees/${selectedEmployee.id}`,
                    employee
                );

            } else {

                await api.post(
                    "/employees/",
                    employee
                );

            }

            setSelectedEmployee(null);
            setShowForm(false);

            loadEmployees();

        } catch (error) {

            console.error(
                "Failed to save employee:",
                error
            );

            alert(
                error.response?.data?.detail ||
                "Failed to save employee"
            );
        }
    }


    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/employees/${id}`
            );

            loadEmployees();

        } catch (error) {

            console.error(
                "Failed to delete employee:",
                error
            );

        }
    }


    function handleEdit(employee) {

        setSelectedEmployee(employee);

        setShowForm(true);
    }


    const filteredEmployees =
        employees.filter((employee) => {

            const searchText =
                search.toLowerCase();

            const fullName =
                `${employee.first_name} ${employee.last_name}`
                    .toLowerCase();

            return (
                fullName.includes(searchText) ||
                employee.employee_id
                    .toLowerCase()
                    .includes(searchText) ||
                employee.email
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    return (

        <div className="page">

            <div className="page-header">

                <div>

                    <h1>
                        Employees
                    </h1>

                    <p>
                        Manage company employees
                    </p>

                </div>


                <button
                    onClick={() => {

                        setSelectedEmployee(null);
                        setShowForm(true);

                    }}
                >
                    + Add Employee
                </button>

            </div>


            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

            </div>


            {showForm && (

                <EmployeeForm
                    selectedEmployee={selectedEmployee}
                    onSubmit={handleSubmit}
                    onCancel={() => {

                        setSelectedEmployee(null);
                        setShowForm(false);

                    }}
                />

            )}


            <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </div>
    );
}

export default Employees;