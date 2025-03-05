import { api } from "@/lib/axios";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};