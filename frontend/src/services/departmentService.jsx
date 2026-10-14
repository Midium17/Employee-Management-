import api from "./api";

const RESOURCE = "/departments/";

export async function getDepartments() {
  const response = await api.get(RESOURCE);
  return response.data;
}

export async function createDepartment(department) {
  const response = await api.post(RESOURCE, department);
  return response.data;
}

export async function updateDepartment(id, department) {
  const response = await api.patch(
    `${RESOURCE}${id}`,
    department
  );

  return response.data;
}

export async function deleteDepartment(id) {
  await api.delete(`${RESOURCE}${id}`);
}