const API_URL = "https://localhost:44332/api";

// =======================
// HEADERS
// =======================
function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// =======================
// SAFE JSON PARSER
// =======================
async function safeJson(res: Response) {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("Invalid JSON from server:", text);
    return null;
  }
}

// =======================
// LOGIN
// =======================
export async function login(login: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ login, password })
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || "Login error");
  }

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// =======================
// COURSES
// =======================
export async function getCourses() {
  const res = await fetch(`${API_URL}/courses/my`, {
    headers: getHeaders()
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error("getCourses error:", data);
    throw new Error("Failed to load courses");
  }

  return Array.isArray(data) ? data : data?.data ?? [];
}

export async function createCourse(course: any) {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(course)
  });

  const data = await safeJson(res);

  console.log("CREATE COURSE RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data?.message || "Create course error");
  }

  return data;
}

// =======================
// CLASSES
// =======================
export async function getClasses() {
  const res = await fetch(`${API_URL}/classes`, {
    headers: getHeaders()
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error("getClasses error:", data);
    throw new Error("Failed to load classes");
  }

  return Array.isArray(data) ? data : data?.data ?? [];
}

export async function createClass(data: any) {
  const res = await fetch(`${API_URL}/classes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  const result = await safeJson(res);

  if (!res.ok) {
    throw new Error(result?.message || await res.text());
  }

  return result;
}

// =======================
// SUBJECTS
// =======================
export async function getSubjects() {
  const res = await fetch(`${API_URL}/subjects`, {
    headers: getHeaders()
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error("getSubjects error:", data);
    throw new Error("Failed to load subjects");
  }

  return Array.isArray(data) ? data : data?.data ?? [];
}

// =======================
// ADMIN
// =======================
export async function createUser(data: any) {
  const res = await fetch(`${API_URL}/admin/create-user`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  const result = await safeJson(res);

  console.log("SERVER RESPONSE:", result);

  if (!res.ok) {
    throw new Error(result?.message || "Create user error");
  }

  return result;
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: getHeaders()
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  return Array.isArray(data) ? data : data?.data ?? [];
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/admin/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления пользователя");
  }
}


// =======================
// Users
// =======================

export async function updateNickname(nickname: string) {
  const res = await fetch(`${API_URL}/user/nickname`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ nickname })
  });

  if (!res.ok) throw new Error("Ошибка обновления");

  return res.json();
}