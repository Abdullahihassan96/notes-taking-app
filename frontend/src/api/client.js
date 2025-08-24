import axios from "axios";

//in production, no localhost..so we make dynamic
const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "api";

export const api = axios.create({
  baseURL: baseURL,
});
