import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

type Course = {
  _id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  category: string
  rating: number
}

type Enrollment = {
  _id: string
  course: Course
  progress: number
  completed: boolean
  enrolledAt: string
}

const StudentDashboard = () => {
  const { user, logout } = useAuth()

  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setIsLoading(true)

        const data = await api(
          "/enrollments/my-courses",
        )

        setEnrollments(data.enrollments || [])
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "কোর্স লোড করা যায়নি"

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  const completedCourses = enrollments.filter(
    (enrollment) => enrollment.completed,
  ).length

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary font-anik">
              Student Dashboard
            </h1>

            <p className="text-gray-500 font-anik mt-1">
              স্বাগতম, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-anik cursor-pointer hover:opacity-90"
          >
            লগআউট
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 font-anik">
              মোট কোর্স
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {enrollments.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 font-anik">
              চলমান কোর্স
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {enrollments.length -
                completedCourses}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 font-anik">
              সম্পন্ন কোর্স
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {completedCourses}
            </p>
          </div>

        </div>

        {/* Courses */}
        <section className="mt-10">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-primary font-anik">
              আমার কোর্স
            </h2>

            <Link
              to="/"
              className="text-primary font-anik font-semibold hover:underline"
            >
              আরও কোর্স দেখুন
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="font-anik text-gray-600">
                কোর্স লোড হচ্ছে...
              </p>
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-red-600 font-anik">
                {error}
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading &&
            !error &&
            enrollments.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center">
                <h3 className="text-xl font-semibold text-primary font-anik">
                  এখনো কোনো কোর্সে ভর্তি হননি
                </h3>

                <p className="text-gray-500 mt-2 font-anik">
                  আপনার পছন্দের কোর্সে ভর্তি হয়ে শেখা শুরু করুন।
                </p>

                <Link
                  to="/"
                  className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik"
                >
                  কোর্স দেখুন
                </Link>
              </div>
            )}

          {/* Course cards */}
          {!isLoading &&
            !error &&
            enrollments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment._id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                  >
                    {/* Thumbnail */}
                    {enrollment.course.thumbnail ? (
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 font-anik">
                          Course Image
                        </span>
                      </div>
                    )}

                    <div className="p-5">

                      <p className="text-sm text-gray-500 font-anik">
                        {enrollment.course.category}
                      </p>

                      <h3 className="text-xl font-bold text-primary font-anik mt-1">
                        {enrollment.course.title}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {enrollment.course.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-5">

                        <div className="flex justify-between text-sm font-anik">
                          <span className="text-gray-500">
                            অগ্রগতি
                          </span>

                          <span className="font-semibold text-primary">
                            {enrollment.progress}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${enrollment.progress}%`,
                            }}
                          />
                        </div>

                      </div>

                      {/* Status */}
                      <div className="mt-4">
                        {enrollment.completed ? (
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-anik">
                            সম্পন্ন
                          </span>
                        ) : (
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-anik">
                            চলমান
                          </span>
                        )}
                      </div>

                      {/* Continue */}
                      <Link
                        to={`/student/learn/${enrollment.course._id}`}
                        className="block text-center mt-5 bg-primary text-white py-3 rounded-lg font-anik hover:opacity-90"
                      >
                        {enrollment.completed
                          ? "কোর্স দেখুন"
                          : "শেখা চালিয়ে যান"}
                      </Link>

                    </div>
                  </div>
                ))}

              </div>
            )}

        </section>
      </main>
    </div>
  )
}

export default StudentDashboard