// axiosInstance.ts

import axios from "axios";

export const axiosInstance = axios.create({
  //   baseURL: import.meta.env.VITE_SERVER_URL,
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});