import { useState } from "react";

export default function Login({ onLogin }: any) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://localhost:44332/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (!res.ok) {
      alert("Ошибка");
      return;
    }

    const data = await res.json();
    onLogin(data.token);
  };

  return (
    <div className="login">
      <h2>Вхід</h2>

      <input placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}