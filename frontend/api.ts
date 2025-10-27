import axios from "axios";
import { checkExpired } from "./lib/jwt";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"}`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      checkExpired(token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type APIResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data?: unknown;
      error: string;
    };