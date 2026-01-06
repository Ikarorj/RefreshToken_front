import axios from "axios";

const API_URL = "http://localhost:3000";

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return accessToken;
}

export function logout() {
  localStorage.clear();
}
