import { useState } from "react";
import api from "../services/api";
import "../App.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setSuccess("Login realizado com sucesso! Redirecionando...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch {
      setError("Email ou senha inválidos.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="feedback error-feedback">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="feedback success-feedback">
              ✅ {success}
            </div>
          )}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
