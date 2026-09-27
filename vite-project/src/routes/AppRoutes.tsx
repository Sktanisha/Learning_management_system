import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/StudentDashboard";
import CourseDetails from "../components/courses/CourseDetails";
import LearningPage from "../pages/student/LearningPage";
import ProtectedRoute from "./ProtectedRoute";
import InstructorDashboard from "../pages/instructor/InstructorDashboard"
import CreateCourse from "../pages/instructor/CreateCourse"
import CourseManagement from "../pages/instructor/CourseManagement"
import CreateLesson from "../pages/instructor/CreateLesson"
import EditLesson from "../pages/instructor/EditLesson"
import EditCourse from "../pages/instructor/EditCourse"
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
        <Route path="/instructor/courses/create" element={<CreateCourse />}/>
        <Route path="/instructor/courses/:id/manage" element={<CourseManagement />}/>
        <Route path="/instructor/courses/:id/lessons/create" element={<CreateLesson />}/>
        <Route path="/instructor/lessons/:id/edit" element={<EditLesson />}/>
        <Route path="/instructor/courses/:id/edit" element={<EditCourse />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
