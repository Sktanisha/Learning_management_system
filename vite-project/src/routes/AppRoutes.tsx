import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../home/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import StudentDashboard from "../pages/student/StudentDashboard"
import CourseDetails from "../components/courses/CourseDetails"

import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>

      {/* Public routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/courses/:id"
        element={<CourseDetails />}
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />
      </Route>

    </Routes>
  </BrowserRouter>
)

export default AppRoutes