
import api from "./api";

const RESOURCE = "/employees/";

export async function getEmployees() {
  const response = await api.get(RESOURCE);
  return response.data;
}

export async function createEmployee(employee) {
  const response = await api.post(RESOURCE, employee);
  return response.data;
}

export async function updateEmployee(id, employee) {
  const response = await api.patch(
    `${RESOURCE}${id}`,
    employee
  );
  return response.data;
}

export async function deleteEmployee(id) {
  await api.delete(`${RESOURCE}${id}`);
}
