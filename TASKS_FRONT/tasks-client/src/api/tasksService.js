import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5154/api",
});

// Add JWT token to all requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get all tasks for the logged-in user
// Backend extracts user ID from JWT token and returns only that user's tasks
export const getTasks = (page = 1, pageSize = 10) => {
  return api.get("/tasks", {
    params: { page, pageSize },
  });
};

// Get task by ID
export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

// Create task
// IMPORTANT: DO NOT send userId from frontend
// Backend extracts userId from JWT token and assigns it automatically
export const createTask = (task) => {
  const { title, description, status } = task;
  return api.post("/tasks", {
    title,
    description,
    status,
  });
};

// Update task - backend verifies ownership via JWT + task userId
export const updateTask = (id, task) => {
  return api.put(`/tasks/${id}`, task);
};

// Delete task - backend verifies ownership via JWT + task userId
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

