import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5154/api",
});

// Add JWT token to all requests
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

// Register new user
export const registerUser = (userData) => {
  // userData: { firstName, lastName, email, password }
  return api.post("/auth/register", userData);
};

// Login user
export const loginUser = (credentials) => {
  // credentials: { email, password }
  return api.post("/auth/login", credentials);
};

// Logout (client-side only, token cleared from localStorage)
export const logout = () => {
  localStorage.removeItem("authToken");
};
