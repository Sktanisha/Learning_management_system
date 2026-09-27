import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/StudentDashboard";
import CourseDetails from "../components/courses/CourseDetails";
import LearningPage from "../pages/student/LearningPage";
import ProtectedRoute from "./ProtectedRoute";
import InstructorDashboard from "../pages/instructor/InstructorDashboard"
const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/learn/:id" element={<LearningPage />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
