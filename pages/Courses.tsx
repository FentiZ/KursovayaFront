import { useEffect, useState } from "react";
import * as api from "../api/api";

type Course = {
  id: number;
  subject?: { name: string };
  class?: { name: string };
  teacher?: { nickname: string };
  isLK: boolean;
};

type Class = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    classId: 0,
    subjectId: 0,
    isLK: false
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);

      const [coursesData, classesData, subjectsData] = await Promise.all([
        api.getCourses(),
        api.getClasses(),
        api.getSubjects()
      ]);

      setCourses(coursesData);
      setClasses(classesData);
      setSubjects(subjectsData);
    } catch (err) {
      console.error("Ошибка загрузки", err);
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async () => {
    try {
      if (!form.classId || !form.subjectId) {
        alert("Выбери класс и предмет");
        return;
      }

      await api.createCourse(form);

      setShowModal(false);
      setForm({ classId: 0, subjectId: 0, isLK: false });

      loadAll();
    } catch (err) {
      console.error("Ошибка создания курса", err);
      alert("Ошибка создания курса");
    }
  };

  // Генерация названия (preview)
  const getPreviewName = () => {
    const cls = classes.find(c => c.id === form.classId);
    const subj = subjects.find(s => s.id === form.subjectId);

    const year = new Date().getFullYear();

    return `${year} ${cls?.name || ""} • ${subj?.name || ""}`;
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>📚 Курсы</h2>
        <button onClick={() => setShowModal(true)}>+ Создать курс</button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="card" style={{ maxWidth: 400 }}>
            <h3>Создать курс</h3>

            {/* PREVIEW */}
            <div style={{ marginBottom: 10, fontWeight: "bold" }}>
              {getPreviewName()}
            </div>

            {/* CLASS */}
            <select
              value={form.classId}
              onChange={e => setForm({ ...form, classId: Number(e.target.value) })}
            >
              <option value={0}>Выбери класс</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* SUBJECT */}
            <select
              value={form.subjectId}
              onChange={e => setForm({ ...form, subjectId: Number(e.target.value) })}
            >
              <option value={0}>Выбери предмет</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* LK */}
            <label style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <input
                type="checkbox"
                checked={form.isLK}
                onChange={e => setForm({ ...form, isLK: e.target.checked })}
              />
              Leistungskurs
            </label>

            <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <button onClick={createCourse}>Создать</button>
              <button onClick={() => setShowModal(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      {loading ? (
        <p>Загрузка...</p>
      ) : courses.length === 0 ? (
        <p>Нет курсов</p>
      ) : (
        <div className="grid">
          {courses.map(c => (
            <div className="card" key={c.id}>
              <h3>{c.subject?.name}</h3>

              <p><b>Класс:</b> {c.class?.name}</p>
              <p><b>Учитель:</b> {c.teacher?.nickname}</p>
              <p><b>Тип:</b> {c.isLK ? "LK" : "Обычный"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}