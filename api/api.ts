const API_URL = "https://localhost:44332/api";

function getHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("Нет токена");
  }

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : ""
  };
}

// ===== LOGIN =====
export async function login(login: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ login, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data);
  }

  localStorage.setItem("token", data.token);

  return data;
}

// ===== COURSES =====
export async function getCourses() {
  const res = await fetch(`${API_URL}/courses/my`, {
    headers: getHeaders()
  });

  return res.json();
}

export async function createCourse(course: any) {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(course)
  });

  const text = await res.text();
  console.log("CREATE COURSE RESPONSE:", text); // 🔥

  if (!res.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : null;
}

export const getClasses = async () => {
  const res = await fetch(`${API_URL}/classes`, {
    headers: getHeaders()
  });

if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  
  return res.json();
};

export const getSubjects = async () => {
  const res = await fetch(`${API_URL}/subjects`, {
    headers: getHeaders()
  });

  if (!res.ok) throw new Error(await res.text());

  return res.status === 204 ? [] : res.json();
};



 // ===== ADMIN =====
  export async function createUser(data: any) {
  const res = await fetch(`${API_URL}/admin/create-user`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  const text = await res.text();
  console.log("SERVER RESPONSE:", text);

  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}
export async function getUsers() {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: getHeaders()
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/admin/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  if (!res.ok) throw new Error("Ошибка удаления");
}

export const createClass = async (data: any) => {
  const res = await fetch(`${API_URL}/classes`, {
    headers: getHeaders(),
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};