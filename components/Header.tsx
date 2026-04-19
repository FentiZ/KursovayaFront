export default function Header({
  onLogout,
  onToggleSidebar,
  nickname,
  theme,
  setTheme,
  lang,
  setLang,
  t
}: any) {
  return (
    <header className="header">
      <button className="burger" onClick={onToggleSidebar}>
        ☰
      </button>

      <div className="header-right">
        <span>👋 {t.welcome}, {nickname}</span>

        {/* LANGUAGE */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
        >
          <option value="ua">UA</option>
          <option value="en">EN</option>
          <option value="de">DE</option>
        </select>

        {/* THEME */}
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button onClick={onLogout}>
          {t.logout}
        </button>
      </div>
    </header>
  );
}