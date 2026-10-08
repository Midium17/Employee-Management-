import { useEffect, useState } from "react";

import api from "../services/api";


function Dashboard() {

    const [employees, setEmployees] =
        useState([]);


    useEffect(() => {

        async function loadEmployees() {

            try {

                const response =
                    await api.get("/employees/");

                setEmployees(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        loadEmployees();

    }, []);


    const totalEmployees =
        employees.length;


    const activeEmployees =
        employees.filter(
            employee =>
                employee.status === "Active"
        ).length;


    const inactiveEmployees =
        employees.filter(
            employee =>
                employee.status === "Inactive"
        ).length;


    const departments =
        new Set(
            employees.map(
                employee =>
                    employee.department
            )
        ).size;


    return (

        <div className="page">

            <div className="page-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Employee management overview
                    </p>

                </div>

            </div>


            <div className="stats-grid">

                <div className="stat-card">

                    <h3>
                        Total Employees
                    </h3>

                    <strong>
                        {totalEmployees}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Active Employees
                    </h3>

                    <strong>
                        {activeEmployees}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Inactive Employees
                    </h3>

                    <strong>
                        {inactiveEmployees}
                    </strong>

                </div>


                <div className="stat-card">

                    <h3>
                        Departments
                    </h3>

                    <strong>
                        {departments}
                    </strong>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;