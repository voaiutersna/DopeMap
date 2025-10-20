import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"}`,
  withCredentials: true,
});

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