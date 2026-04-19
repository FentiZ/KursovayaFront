import { useEffect, useState } from "react";
import * as api from "../api/api";
import translations from "../translations";

export default function AdminPanel({ lang }: any) {
  const t = translations[lang];

  const [users, setUsers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [form, setForm] = useState({
    login: "",
    password: "",
    nickname: "",
    role: "Teacher",
    age: 18
  });

  const [newClass, setNewClass] = useState({
    type: "normal",
    grade: "10",
    letter: "A"
  });

  useEffect(() => {
    loadUsers();
    loadClasses();
  }, []);

  const loadUsers = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  const handleCreate = async () => {
    await api.createUser(form);
    loadUsers();
  };

  const handleDelete = async (id: number) => {
    await api.deleteUser(id);
    loadUsers();
  };

  const loadClasses = async () => {
    const data = await api.getClasses();
    setClasses(data);
  };

  const createClass = async () => {
    let name = "";

    if (newClass.type === "normal") {
      name = `${newClass.grade}${newClass.letter}`;
    } else {
      name = newClass.type;
    }

    await api.createClass({ name });
    loadClasses();
  };

  const deleteClass = async (id: number) => {
    await api.deleteClass(id);
    loadClasses();
  };

  return (
    <div className="page">
      <h1>⚙️ {t.admin}</h1>

      <div className="card">
        <h3>{t.createUser}</h3>

        <div className="form-row">
          <input placeholder="Login"
            onChange={e => setForm({ ...form, login: e.target.value })} />

          <input placeholder="Password" type="password"
            onChange={e => setForm({ ...form, password: e.target.value })} />

          <input placeholder="Nickname"
            onChange={e => setForm({ ...form, nickname: e.target.value })} />

          <input placeholder="Age" type="number"
            onChange={e => setForm({ ...form, age: Number(e.target.value) })} />

          <select onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>

          <button className="btn primary" onClick={handleCreate}>
            ➕
          </button>
        </div>
      </div>

      <div className="card">
        <h3>👥 {t.users}</h3>

        {users.map(u => (
          <div className="class-item" key={u.id}>
            <span>{u.login} ({u.role})</span>
            <button className="btn danger" onClick={() => handleDelete(u.id)}>
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>🏫 {t.classes}</h3>

        <div className="form-row">
          <select
            onChange={e => setNewClass({ ...newClass, type: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="EF">EF</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
          </select>

          {newClass.type === "normal" && (
            <>
              <select
                onChange={e => setNewClass({ ...newClass, grade: e.target.value })}
              >
                {[5,6,7,8,9,10].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>

              <select
                onChange={e => setNewClass({ ...newClass, letter: e.target.value })}
              >
                {["A","B","C"].map(l => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </>
          )}

          <button className="btn primary" onClick={createClass}>
            ➕
          </button>
        </div>

        {classes.map(c => (
          <div className="class-item" key={c.id}>
            <span>{c.name}</span>
            <button className="btn danger" onClick={() => deleteClass(c.id)}>
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}