import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log({
      email,
      password,
    })
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full mt-7 bg-primary text-white font-anik font-semibold py-3 rounded-lg cursor-pointer hover:opacity-90 transition"
          >
            লগইন
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