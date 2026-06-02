import { api } from "@/lib/axios";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (title: string, folderId: string) => {
  const response = await api.post("/tasks", { title, folderId });
  return response.data;
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: string
) => {
  const response = await api.patch(`/tasks/${id}`, {
    title,
    description,
    status,
  });
  return response.data;
};

export const getTasksByFolder = async (folderId: string) => {
  const response = await api.get(`/tasks/folder/${folderId}`);
  return response.data;
};
