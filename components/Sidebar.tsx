export default function Sidebar({ setPage, page, isOpen }: any) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h2 className="logo">KASium</h2>

      <nav>
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          🏠 Головна
        </button>

        <button
          className={page === "courses" ? "active" : ""}
          onClick={() => setPage("courses")}
        >
          📚 Курси
        </button>

        <button
          className={page === "chat" ? "active" : ""}
          onClick={() => setPage("chat")}
        >
          💬 Чат
        </button>

        <button
          className={page === "profile" ? "active" : ""}
          onClick={() => setPage("profile")}
        >
          👤 Профіль
        </button>

        <button
          className={page === "admin" ? "active" : ""}
          onClick={() => setPage("admin")}
        >
          ⚙️ Адмін
        </button>
      </nav>
    </aside>
  );
}