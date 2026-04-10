export default function Profile() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return (
    <div className="card profile">
      <h2>👤 Профіль</h2>

      <div className="profile-grid">
        <div><b>Нік:</b> {payload.nickname}</div>
        <div><b>Роль:</b> {payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]}</div>
        <div><b>Login:</b> {payload.unique_name}</div>
      </div>
    </div>
  );
}