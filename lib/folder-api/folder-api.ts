import { api } from "@/lib/axios";

export const getFolders = async () => {
  try {
    const response = await api.get("/folders");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (title: string) => {
  try {
    const response = await api.post("/folders", { title });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = async (id: string, title: string) => {
  try {
    const response = await api.patch(`/folders/${id}`, { title });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (id: string) => {
  try {
    const response = await api.delete(`/folders/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
