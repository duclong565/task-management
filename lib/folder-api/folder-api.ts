import { api } from "@/lib/axios";

export const getFolders = async () => {
  const response = await api.get("/folders");
  return response.data;
};

export const createFolder = async (title: string) => {
  const response = await api.post("/folders", { title });
  return response.data;
};

export const updateFolder = async (id: string, title: string) => {
  const response = await api.patch(`/folders/${id}`, { title });
  return response.data;
};

export const deleteFolder = async (id: string) => {
  const response = await api.delete(`/folders/${id}`);
  return response.data;
};
