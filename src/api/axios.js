import axios from "axios";

// CHANGE: Use Environment Variable
// If VITE_API_URL exists (Vercel), use it. Otherwise use localhost.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important: Allows cookies to be sent/received
});

const getEmailFromToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1])).email;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!refreshToken || !accessToken) {
        return Promise.reject(error);
      }

      const email = getEmailFromToken(accessToken);
      if (!email) {
        return Promise.reject(error);
      }

      try {
        // Note: Using api.post here leverages the baseURL automatically
        const res = await api.post("/api/auth/refresh-token", {
          email,
          refreshToken,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log them out or reject
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;