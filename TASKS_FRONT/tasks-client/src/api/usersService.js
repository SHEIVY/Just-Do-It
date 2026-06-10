import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5154/api/user",
});

export const fetchUsers = () => api.get("/");
export const fetchUserById = (id) => api.get(`/${id}`);
export const createUser = (user) => api.post("/", user);
export const updateUser = (id, user) => api.put(`/${id}`, user);
export const deleteUser = (id) => api.delete(`/${id}`);
