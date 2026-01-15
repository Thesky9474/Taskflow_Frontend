import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected app routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={ 
            <RequireAuth>
              <Dashboard />
            </RequireAuth>} />
          <Route path="/tasks" element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
