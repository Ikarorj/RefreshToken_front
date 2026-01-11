import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

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

    // 🚫 REGRA 1: NUNCA tentar refresh no login
    if (originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // 🚫 REGRA 2: NUNCA tentar refresh no refresh
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // 🔁 Só tenta refresh se for 401 e ainda não tentou antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          { refreshToken }
        );

        localStorage.setItem("accessToken", response.data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${response.data.accessToken}`;

        return api(originalRequest);
      } catch {
        logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}

export default api;
