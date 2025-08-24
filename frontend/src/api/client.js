import axios from "axios";

//in production, we make this dynamic i.e no localhost
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/api";

export const api = axios.create({
  baseURL: BASE_URL,
});
