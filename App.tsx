import { useState } from "react";
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


  const payload = JSON.parse(atob(token.split(".")[1]));
  const role =
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const nickname = payload["nickname"] || "User";

  return (
    <div className="app">
      <Sidebar setPage={setPage} page={page} isOpen={sidebarOpen} />

      <div className="main">
        <Header
          nickname={nickname}
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
          {page === "profile" && <Profile />}
          {page === "admin" && role === "Admin" && <AdminPanel />}
        </div>
      </div>
    </div>
  );
}

export default App;