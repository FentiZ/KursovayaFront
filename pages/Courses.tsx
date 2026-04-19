import { useEffect, useState } from "react";
import * as api from "../api/api";

export default function Courses({ t }: any) {
  const [courses, setCourses] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
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

    setCourses(coursesData || []);
    setClasses(classesData || []);
    setSubjects(subjectsData || []);
  } catch (err) {
    console.error("LOAD ERROR:", err);
    setCourses([]); // не даём упасть
  } finally {
    setLoading(false);
  }
};

  const createCourse = async () => {
    if (!form.classId || !form.subjectId) {
      alert("Select class and subject");
    return;
}

    try {
      await api.createCourse(form);
        } catch (err) {
          console.error(err);
          alert("Create error");
        }

    setForm({
      classId: 0,
      subjectId: 0,
      isLK: false
    });

    setShowModal(false);
    loadAll();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>📚 {t.courses}</h2>
        <button onClick={() => setShowModal(true)}>+ {t.createCourse}</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="card" style={{ maxWidth: 400 }}>
            <h3>{t.createCourse}</h3>

            <select
              onChange={e => setForm({ ...form, classId: Number(e.target.value) })}
            >
              <option value={0}>{t.selectClass}</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              onChange={e => setForm({ ...form, subjectId: Number(e.target.value) })}
            >
              <option value={0}>{t.selectSubject}</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <div style={{ marginTop: 10 }}>
              <label>
                <input
                  type="checkbox"
                  onChange={e => setForm({ ...form, isLK: e.target.checked })}
                />
                Leistungskurs
              </label>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <button onClick={createCourse}>{t.create}</button>
              <button onClick={() => setShowModal(false)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>{t.loading}</p>
      ) : courses.length === 0 ? (
        <p>{t.noCourses}</p>
      ) : (
        <div className="grid">
          {courses.map(c => (
            <div className="card" key={c.id}>
              <h3>{c.subject?.name}</h3>

              <p><b>{t.class}:</b> {c.class?.name}</p>
              <p><b>{t.teacher}:</b> {c.teacher?.nickname}</p>
              <p><b>{t.type}:</b> {c.isLK ? "LK" : t.normal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}