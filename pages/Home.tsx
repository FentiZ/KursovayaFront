export default function Home() {
  return (
    <div className="grid">
      <div className="card">
        <h3>Середній бал</h3>
        <p className="big">10.5</p>
      </div>

      <div className="card">
        <h3>Відвідуваність</h3>
        <p className="big">92%</p>
      </div>

      <div className="card wide">
        <h3>Календар</h3>
        <p>Тут буде інтерактивний календар</p>
      </div>

      <div className="card">
        <h3>Чати</h3>
        <p>3 нових повідомлення</p>
      </div>

      <div className="card">
        <h3>Курси</h3>
        <p>5 активних курсів</p>
      </div>
    </div>
  );
}