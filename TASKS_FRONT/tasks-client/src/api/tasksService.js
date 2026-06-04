import axios from "axios";
const API_URL = "http://localhost:5154/api/Tasks";
export const getTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (task) => {
  return axios.post(API_URL, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};

