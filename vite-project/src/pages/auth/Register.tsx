import { useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
) => {
  e.preventDefault()

  const newErrors: Record<string, string> = {}

  if (!name.trim()) {
    newErrors.name = "নাম লিখুন"
  }

  if (!email.trim()) {
    newErrors.email = "ইমেইল লিখুন"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "সঠিক ইমেইল দিন"
  }

  if (!password) {
    newErrors.password = "পাসওয়ার্ড লিখুন"
  } else if (password.length < 6) {
    newErrors.password =
      "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
  }

  if (!confirmPassword) {
    newErrors.confirmPassword =
      "পাসওয়ার্ড আবার লিখুন"
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "পাসওয়ার্ড মিলছে না"
  }

  setErrors(newErrors)
  setServerError("")

  if (Object.keys(newErrors).length > 0) {
    return
  }

  try {
    setIsLoading(true)

    const data = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    })

    console.log("Registration successful:", data)

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "রেজিস্ট্রেশন ব্যর্থ হয়েছে"

    setServerError(message)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[500px] bg-white rounded-[15px] shadow-md p-8">

        <div className="text-center font-anik">
          <h1 className="text-3xl font-bold text-primary">
            রেজিস্ট্রেশন
          </h1>

          <p className="mt-2 text-gray-600">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-anik font-semibold text-primary mb-2"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1 font-anik">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mt-5">
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
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-anik">
                {errors.email}
              </p>
            )}
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
              placeholder="পাসওয়ার্ড লিখুন"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-anik">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="mt-5">
            <label
              htmlFor="confirmPassword"
              className="block font-anik font-semibold text-primary mb-2"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              className={`w-full border rounded-lg px-4 py-3 outline-none ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-primary"
              }`}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 font-anik">
                {errors.confirmPassword}
              </p>
            )}
          </div>
{serverError && (
  <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm font-anik">
    {serverError}
  </div>
)}
          {/* Submit */}
          <button
  type="submit"
  disabled={isLoading}
  className="w-full mt-7 bg-primary text-white font-anik font-semibold py-3 rounded-lg cursor-pointer hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isLoading
    ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
    : "অ্যাকাউন্ট তৈরি করুন"}
</button>
        </form>

        {/* Login */}
        <p className="text-center mt-6 font-anik text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            লগইন করুন
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register