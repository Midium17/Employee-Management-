function EmployeeTable({
    employees,
    onEdit,
    onDelete
}) {

    return (
        <div className="table-container">

            <table>

                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>
                                {employee.employee_id}
                            </td>

                            <td>
                                {employee.first_name}{" "}
                                {employee.last_name}
                            </td>

                            <td>
                                {employee.department}
                            </td>

                            <td>
                                {employee.job_title}
                            </td>

                            <td>
                                {employee.email}
                            </td>

                            <td>
                                <span
                                    className={
                                        employee.status === "Active"
                                            ? "status active"
                                            : "status inactive"
                                    }
                                >
                                    {employee.status}
                                </span>
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        onEdit(employee)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="danger"
                                    onClick={() =>
                                        onDelete(employee.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeTable;