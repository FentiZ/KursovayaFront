export default function Sidebar({ setPage }: any) {
  return (
    <aside className="sidebar">
      <h2 className="logo">KASium</h2>

      <nav>
        <button onClick={() => setPage("home")}>🏠 Головна</button>
        <button onClick={() => setPage("courses")}>📚 Курси</button>
        <button onClick={() => setPage("chat")}>💬 Чати</button>
        <li onClick={() => setPage("admin")}>⚙️ Admin</li>
      </nav>
    </aside>
  );
}