import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

/**
 * Shared axios instance. Configure the backend base URL via the
 * `VITE_API_URL` environment variable.
 */
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Attach auth token when running in the browser (SSR-safe).
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("vm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Normalise error responses so callers get a consistent Error.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);

/** Thin typed helpers so services stay terse and consistent. */
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((r: AxiosResponse<T>) => r.data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    api.post<T>(url, body, config).then((r: AxiosResponse<T>) => r.data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    api.put<T>(url, body, config).then((r: AxiosResponse<T>) => r.data),
  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    api.patch<T>(url, body, config).then((r: AxiosResponse<T>) => r.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((r: AxiosResponse<T>) => r.data),
};
