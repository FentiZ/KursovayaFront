import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Home";
import Courses from "./pages/Courses";
import Chat from "./pages/Chat";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");

  if (!token) {
    return <Login onLogin={(t: string) => {
      localStorage.setItem("token", t);
      setToken(t);
    }} />;
  }

  // decode JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>KASium</h2>

        <button onClick={() => setPage("dashboard")}>🏠 Головна</button>
        <button onClick={() => setPage("courses")}>📚 Курси</button>
        <button onClick={() => setPage("chat")}>💬 Чат</button>

        {role === "Admin" && (
          <button onClick={() => setPage("admin")}>
            ⚙️ Адмін
          </button>
        )}

        <button onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}>
          🚪 Вийти
        </button>
      </div>

      {/* CONTENT */}
      <div className="content">
        {page === "dashboard" && <Dashboard />}
        {page === "courses" && <Courses />}
        {page === "chat" && <Chat />}
        {page === "admin" && role === "Admin" && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;