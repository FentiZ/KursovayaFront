import { useState } from "react";

export default function Profile({ user, setUser }: any) {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [theme, setTheme] = useState(user?.theme || "dark");
  const token = localStorage.getItem("token");

  // =========================
  // Обновление никнейма
  // =========================
  const updateNickname = async () => {
    try {
      const res = await fetch(
        "https://localhost:44332/api/users/nickname",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nickname }),
        }
      );

      if (!res.ok) throw new Error();

      setUser((prev: any) => ({ ...prev, nickname }));

      alert("Никнейм обновлен");
    } catch {
      alert("Ошибка обновления никнейма");
    }
  };

  // =========================
  // Обновление темы
  // =========================
  const updateTheme = async (newTheme: string) => {
    try {
      const res = await fetch(
        "https://localhost:44332/api/users/theme",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ theme: newTheme }),
        }
      );

      if (!res.ok) throw new Error();

      setTheme(newTheme);

      setUser((prev: any) => ({ ...prev, theme: newTheme }));

      document.body.className = newTheme;
    } catch {
      alert("Ошибка смены темы");
    }
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="profile">
      <h2>👤 Профіль</h2>

      {/* ===================== */}
      {/* Информация */}
      {/* ===================== */}
      <div className="card">
        <p><b>Логін:</b> {user.login}</p>
        <p><b>Роль:</b> {user.role}</p>
        <p><b>Вік:</b> {user.age}</p>
      </div>

      {/* ===================== */}
      {/* Никнейм */}
      {/* ===================== */}
      <div className="card">
        <h3>✏️ Змінити нікнейм</h3>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Новий нікнейм"
        />

        <button onClick={updateNickname}>
          Зберегти
        </button>
      </div>

      {/* ===================== */}
      {/* Тема */}
      {/* ===================== */}
      {/* <div className="card">
        <h3>🎨 Тема</h3>

        <div className="theme-buttons">
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => updateTheme("dark")}
          >
            🌙 Темна
          </button>

          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => updateTheme("light")}
          >
            ☀️ Світла
          </button>
        </div>
      </div> */}
    </div>
  );
}