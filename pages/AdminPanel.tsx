import { useEffect, useState } from "react";
import * as api from "../api/api";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  // USER FORM
  const [form, setForm] = useState({
    login: "",
    password: "",
    nickname: "",
    role: "Teacher",
    age: 18
  });

  // CLASS FORM
  const [newClass, setNewClass] = useState({
    type: "normal", // normal | EF | Q1 | Q2
    grade: "10",
    letter: "A"
  });

  useEffect(() => {
    loadUsers();
    loadClasses();
  }, []);

  // ================= USERS =================

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async () => {
    try {
      await api.createUser(form);
      loadUsers();
      alert("Пользователь создан");
    } catch {
      alert("Ошибка");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteUser(id);
      loadUsers();
    } catch {
      alert("Ошибка удаления");
    }
  };

  // ================= CLASSES =================

  const loadClasses = async () => {
    try {
      const data = await api.getClasses();
      setClasses(data);
    } catch (e) {
      console.error(e);
    }
  };

  const createClass = async () => {
    try {
      let name = "";

      if (newClass.type === "normal") {
        name = `${newClass.grade}${newClass.letter}`;
      } else {
        name = newClass.type; // EF / Q1 / Q2
      }

      await api.createClass({ name });

      loadClasses();
    } catch (e) {
      console.error(e);
      alert("Ошибка создания класса");
    }
  };

  // ================= UI =================

  return (
    <div className="page">
      <h1>⚙️ Админ панель</h1>

      {/* ===== USERS ===== */}
      <div className="card">
        <h3>Создать пользователя</h3>

        <input placeholder="Login"
          onChange={e => setForm({ ...form, login: e.target.value })} />

        <input placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <input placeholder="Nickname"
          onChange={e => setForm({ ...form, nickname: e.target.value })} />

        <input placeholder="Age"
          type="number"
          onChange={e => setForm({ ...form, age: Number(e.target.value) })} />

        <select onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={handleCreate}>➕ Создать</button>
      </div>

      <div className="card">
        <h3>👥 Пользователи</h3>

        <div className="table">
          {users.map(u => (
            <div className="row" key={u.id}>
              <div>{u.login}</div>
              <div>{u.role}</div>
              <div>{u.age}</div>

              <button onClick={() => handleDelete(u.id)}>❌</button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CLASSES ===== */}
      <div className="card">
        <h3>🏫 Классы</h3>

        {/* TYPE */}
        <select
          onChange={e => setNewClass({ ...newClass, type: e.target.value })}
        >
          <option value="normal">Обычный класс</option>
          <option value="EF">EF</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
        </select>

        {/* NORMAL CLASS */}
        {newClass.type === "normal" && (
          <div style={{ display: "flex", gap: 10 }}>
            <select
              onChange={e => setNewClass({ ...newClass, grade: e.target.value })}
            >
              {[5,6,7,8,9,10].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select
              onChange={e => setNewClass({ ...newClass, letter: e.target.value })}
            >
              {["A","B","C"].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        )}

        <button onClick={createClass}>➕ Создать класс</button>

        {/* LIST */}
        <div className="table">
          {classes.map(c => (
            <div className="row" key={c.id}>
              <div>{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}