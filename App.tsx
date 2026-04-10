import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Home";
import Courses from "./pages/Courses";
import Chat from "./pages/Chat";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState<any>(null);

  // =========================
  // Загрузка пользователя
  // =========================
  const loadUser = async () => {
    try {
      const res = await fetch("https://localhost:44332/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка загрузки пользователя");

      const data = await res.json();
      setUser(data);

      // тема берется с сервера
      setTheme(data.theme || "dark");
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // При старте
  // =========================
  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token]);

  // =========================
  // Применение темы
  // =========================
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // =========================
  // Если не залогинен
  // =========================
  if (!token) {
    return (
      <Login
        onLogin={(t: string) => {
          localStorage.setItem("token", t);
          setToken(t);
        }}
      />
    );
  }

  // =========================
  // Получение роли из JWT
  // =========================
  const payload = JSON.parse(atob(token.split(".")[1]));

  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  
  const nickname = user?.nickname || "User";

  return (
    <div className={`app ${theme}`}>
      <Sidebar
        setPage={setPage}
        page={page}
        isOpen={sidebarOpen}
        role={role}
      />

      <div className="main">
        <Header
        nickname={nickname}
        theme={theme}
        setTheme={setTheme}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        />

        <div className="content">
          {page === "dashboard" && <Dashboard />}
          {page === "courses" && <Courses />}
          {page === "chat" && <Chat />}

          {/* 👇 Передаем user и setUser */}
          {page === "profile" && (
            <Profile user={user} setUser={setUser} />
          )}

          {page === "admin" && role === "Admin" && <AdminPanel />}
        </div>
      </div>
    </div>
  );
}

export default App;