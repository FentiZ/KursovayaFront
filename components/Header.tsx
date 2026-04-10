export default function Header({
  onLogout,
  onToggleSidebar,
  nickname,
  theme,
  setTheme
}: any) {
  return (
    <header className="header">
      <button className="burger" onClick={onToggleSidebar}>
        ☰
      </button>

      <div className="header-right">
        <span>👋 {nickname}</span>

        {/* Переключатель темы */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button onClick={onLogout}>Вийти</button>
      </div>
    </header>
  );
}