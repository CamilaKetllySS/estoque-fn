import axios from "axios";
import { API_BASE_URL } from "@env";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/products`,
  timeout: 5000,
});

export default apiClient;