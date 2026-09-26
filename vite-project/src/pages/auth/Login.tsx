import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    setError("")

    if (!email.trim()) {
      setError("ইমেইল লিখুন")
      return
    }

    if (!password) {
      setError("পাসওয়ার্ড লিখুন")
      return
    }

    try {
  setIsLoading(true)

  const data = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  })

  login(data.user, data.token)

  if (data.user.role === "student") {
    navigate("/student/dashboard")
  } else if (data.user.role === "instructor") {
    navigate("/instructor/dashboard")
  } else if (data.user.role === "admin") {
    navigate("/admin/dashboard")
  } else {
    navigate("/")
  }
} catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : "লগইন ব্যর্থ হয়েছে"

  setError(message)
} finally {
  setIsLoading(false)
}
  }
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-[450px] bg-white rounded-[15px] shadow-md p-8">

        <div className="text-center font-anik">
          <h1 className="text-3xl font-bold text-primary">
            লগইন করুন
          </h1>

          <p className="mt-2 text-gray-600">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-anik font-semibold text-primary mb-2"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label
              htmlFor="password"
              className="block font-anik font-semibold text-primary mb-2"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm font-anik">
              {error}
            </div>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-7 bg-primary text-white font-anik font-semibold py-3 rounded-lg cursor-pointer hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "লগইন হচ্ছে..." : "লগইন"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center mt-6 font-anik text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            রেজিস্টার করুন
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login