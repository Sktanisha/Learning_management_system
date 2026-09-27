import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

type Instructor = {
  _id: string
  name: string
  email: string
}

type Course = {
  _id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  category: string
  rating: number
  instructor: Instructor
  students?: string[]
  lessons?: string[]
}

const InstructorDashboard = () => {
  const { user, logout } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        setError("")

        const data = await api("/courses")

        const allCourses: Course[] =
          data.courses || []

        // Only show courses created by the logged-in instructor
        const myCourses = allCourses.filter(
          (course) =>
            course.instructor?._id === user?.id,
        )

        setCourses(myCourses)
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

    if (user?.id) {
      fetchCourses()
    }
  }, [user?.id])

  const totalStudents = courses.reduce(
    (total, course) =>
      total + (course.students?.length || 0),
    0,
  )

  const totalLessons = courses.reduce(
    (total, course) =>
      total + (course.lessons?.length || 0),
    0,
  )

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* Header */}
      <header className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-primary font-anik">
              Instructor Dashboard
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

          {/* Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-gray-500 font-anik">
              মোট কোর্স
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {courses.length}
            </p>

          </div>

          {/* Students */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-gray-500 font-anik">
              মোট স্টুডেন্ট
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalStudents}
            </p>

          </div>

          {/* Lessons */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-gray-500 font-anik">
              মোট লেসন
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalLessons}
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
  to="/instructor/courses/create"
  className="bg-primary text-white px-5 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90"
>
  + নতুন কোর্স
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
            courses.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center">

                <h3 className="text-xl font-semibold text-primary font-anik">
                  এখনো কোনো কোর্স তৈরি করেননি
                </h3>

                <p className="text-gray-500 mt-2 font-anik">
                  আপনার প্রথম কোর্স তৈরি করুন।
                </p>

              </div>
            )}

          {/* Course Cards */}
          {!isLoading &&
            !error &&
            courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {courses.map((course) => (

                  <div
                    key={course._id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm"
                  >

                    {/* Thumbnail */}
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
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
                        {course.category}
                      </p>

                      <h3 className="text-xl font-bold text-primary font-anik mt-1">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex justify-between mt-4">

                        <div>
                          <p className="text-xs text-gray-500 font-anik">
                            Students
                          </p>

                          <p className="font-bold text-primary">
                            {course.students?.length || 0}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 font-anik">
                            Lessons
                          </p>

                          <p className="font-bold text-primary">
                            {course.lessons?.length || 0}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 font-anik">
                            Price
                          </p>

                          <p className="font-bold text-primary">
                            ৳ {course.price}
                          </p>
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-3 mt-5">

                        <Link
                          to={`/courses/${course._id}`}
                          className="text-center border border-primary text-primary py-2.5 rounded-lg font-anik font-semibold hover:bg-gray-50"
                        >
                          দেখুন
                        </Link>

                        <Link
  to={`/instructor/courses/${course._id}/manage`}
  className="bg-primary text-white py-2.5 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 text-center"
>
  ম্যানেজ
</Link>

                      </div>

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

export default InstructorDashboard