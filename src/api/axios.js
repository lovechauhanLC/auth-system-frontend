import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
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

      const res = await api.post("/api/auth/refresh-token", {
        email,
        refreshToken,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      originalRequest.headers.Authorization =
        `Bearer ${res.data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;