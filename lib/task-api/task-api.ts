import { api } from "@/lib/axios";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (title: string, folderId: string) => {
  try {
    const response = await api.post("/tasks", { title, folderId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: string
) => {
  try {
    const response = await api.patch(`/tasks/${id}`, { title, description, status });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasksByFolder = async (folderId: string) => {
  try {
    const response = await api.get(`/tasks/folder/${folderId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
