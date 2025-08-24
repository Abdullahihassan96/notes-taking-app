import axios from "axios";

//in production, no localhost..so we make dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const api = axios.create({
  baseURL: BASE_URL,
});
