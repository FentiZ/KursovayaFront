export default function Header({ onLogout, onToggleSidebar, nickname }: any) {
  return (
    <header className="header">
      <button className="burger" onClick={onToggleSidebar}>
        ☰
      </button>

      <div className="header-right">
        <span>👋 {nickname}</span>
        <button onClick={onLogout}>Вийти</button>
      </div>
    </header>
  );
}