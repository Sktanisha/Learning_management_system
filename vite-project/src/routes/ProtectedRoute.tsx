import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  // Wait until localStorage authentication is checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-anik text-gray-600">
          লোড হচ্ছে...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute