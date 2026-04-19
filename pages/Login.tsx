import { useState } from "react";

export default function Login({ onLogin, t }: any) {
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
      alert(t.error);
      return;
    }

    const data = await res.json();
    onLogin(data.token);
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>{t.signIn}</h2>

        <input
          placeholder={t.login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder={t.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>{t.signIn}</button>
      </div>
    </div>
  );
}