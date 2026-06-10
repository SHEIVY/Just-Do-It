import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <BrowserRouter>
      <MainLayout filter={filter} setFilter={setFilter}>
        <Routes>
          <Route path="/" element={<Dashboard filter={filter} />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;