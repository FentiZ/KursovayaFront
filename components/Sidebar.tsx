export default function Sidebar({ setPage, page, isOpen, role, t }: any) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h2 className="logo">KASium</h2>

      <nav>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          🏠 {t.home}
        </button>

        <button
          className={page === "courses" ? "active" : ""}
          onClick={() => setPage("courses")}
        >
          📚 {t.courses}
        </button>

        <button
          className={page === "chat" ? "active" : ""}
          onClick={() => setPage("chat")}
        >
          💬 {t.chat}
        </button>

        <button
          className={page === "profile" ? "active" : ""}
          onClick={() => setPage("profile")}
        >
          👤 {t.profile}
        </button>

        {role === "Admin" && (
          <button
            className={page === "admin" ? "active" : ""}
            onClick={() => setPage("admin")}
          >
            ⚙️ {t.admin}
          </button>
        )}
      </nav>
    </aside>
  );
}