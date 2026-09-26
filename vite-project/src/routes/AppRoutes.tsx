import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
//import TestProtected from "../pages/TestProtected";
import StudentDashboard from "../pages/student/StudentDashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
