import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hydrateAuth } from "./store/userSlice";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();
  const isHydrated = useSelector((state) => state.user.isHydrated);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Initialize auth state from localStorage on app startup
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  // Don't render anything until auth state is hydrated
  if (!isHydrated) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>טוען...</div>;
  }

  // If no user is logged in, show login page
  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // User is logged in, show main app
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
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