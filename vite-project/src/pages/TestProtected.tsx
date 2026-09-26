import { useAuth } from "../context/AuthContext"

const TestProtected = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="bg-white rounded-[15px] shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-primary font-anik">
          Protected Page
        </h1>

        <p className="mt-4 font-anik">
          স্বাগতম, {user?.name}
        </p>

        <p className="mt-2 text-gray-600">
          Role: {user?.role}
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-primary text-white px-6 py-3 rounded-lg cursor-pointer"
        >
          লগআউট
        </button>
      </div>
    </div>
  )
}

export default TestProtected