import apiClient from "../api/apiClient";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const createProduct = async (formData: FormData): Promise<void> => {
  try {
    await apiClient.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw new Error("Erro ao criar o produto.");
  }
};
export const updateProduct = async (id: string, formData: FormData): Promise<void> => {
  try {
    await apiClient.put(`/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
};