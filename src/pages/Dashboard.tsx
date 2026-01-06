import { useEffect, useState } from "react";
import api from "../services/api";


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
      {user && <p>Bem-vindo, {user.email}</p>}
    </div>
  );
}


