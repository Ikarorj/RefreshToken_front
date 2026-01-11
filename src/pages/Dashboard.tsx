import { useEffect, useState } from "react";
import api from "../services/api";
import "../App.css";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/auth/protected")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>se veio para cá, é porque funcionou kkkk</p>
      {user && <p>Bem-vindo, {user.email}</p>}
    </div>
  );
}


