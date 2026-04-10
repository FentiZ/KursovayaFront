export default function Header({ onLogout, onTheme }: any) {
  return (
    <header className="header">
      <h1>Dashboard</h1>

      <div>
        <button onClick={onTheme}>🌗</button>
        <button onClick={onLogout}>Вийти</button>
      </div>
    </header>
  );
}