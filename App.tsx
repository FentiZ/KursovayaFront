import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import translations from "./translations";

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

  // 🌍 LANGUAGE
  const [lang, setLang] = useState<"en" | "de" | "ua">("en");
  const t = translations[lang];

  const loadUser = async () => {
    try {
      const res = await fetch("https://localhost:44332/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data);
      setTheme(data.theme || "dark");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) loadUser();
  }, [token]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (!token) {
    return (
      <Login
        onLogin={(tkn: string) => {
          localStorage.setItem("token", tkn);
          setToken(tkn);
        }}
        t={t} // ✅ добавили
      />
    );
  }

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
        t={t}
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
          lang={lang}
          setLang={setLang}
          t={t}
        />

        <div className="content">
          {page === "dashboard" && <Dashboard />}

          {page === "courses" && (
            <Courses t={t} />   // ✅ ВАЖНО
          )}

          {page === "chat" && (
            <Chat t={t} />      // ✅ ВАЖНО
          )}

          {page === "profile" && (
            <Profile user={user} setUser={setUser} />
          )}

          {page === "admin" && role === "Admin" && (
            <AdminPanel lang={lang} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;