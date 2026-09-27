import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

type Instructor = {
  _id: string
  name: string
  email: string
}

type Lesson = {
  _id: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
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
  lessons?: Lesson[]
}

const InstructorDashboard = () => {
  const { user, logout } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      setError("")

      const data = await api("/courses")

      const allCourses: Course[] = data.courses || []

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

  useEffect(() => {
    if (user?.id) {
      fetchCourses()
    }
  }, [user?.id])

  const handleDeleteCourse = async (courseId: string) => {
    const confirmed = window.confirm(
      "আপনি কি এই কোর্সটি ডিলিট করতে চান? কোর্সটি ডিলিট করলে এর সাথে সম্পর্কিত তথ্যও মুছে যেতে পারে।",
    )

    if (!confirmed) {
      return
    }

    try {
      await api(`/courses/${courseId}`, {
        method: "DELETE",
      })

      await fetchCourses()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "কোর্স ডিলিট করা যায়নি"

      alert(message)
    }
  }

  const totalCourses = courses.length

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <p className="font-anik text-gray-600">
          ড্যাশবোর্ড লোড হচ্ছে...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary font-anik">
                Instructor Dashboard
              </h1>

              <p className="text-gray-500 font-anik mt-1">
                স্বাগতম, {user?.name}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-primary font-anik font-semibold hover:underline"
              >
                Home
              </Link>

              <button
                type="button"
                onClick={logout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg font-anik font-semibold cursor-pointer hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary font-anik">
              আমার কোর্স
            </h2>

            <p className="text-gray-500 font-anik mt-1">
              আপনার তৈরি করা কোর্সগুলো ম্যানেজ করুন
            </p>
          </div>

          <Link
            to="/instructor/courses/create"
            className="inline-flex items-center justify-center bg-primary text-white px-5 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 transition"
          >
            + নতুন কোর্স
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 font-anik">
              {error}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Total Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 font-anik">
              মোট কোর্স
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalCourses}
            </p>
          </div>

          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 font-anik">
              মোট শিক্ষার্থী
            </p>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalStudents}
            </p>
          </div>

          {/* Total Lessons */}
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
        {courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <h3 className="text-xl font-semibold text-primary font-anik">
              এখনো কোনো কোর্স নেই
            </h3>

            <p className="text-gray-500 mt-2 font-anik">
              আপনার প্রথম কোর্স তৈরি করুন।
            </p>

            <Link
              to="/instructor/courses/create"
              className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 transition"
            >
              + নতুন কোর্স তৈরি করুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Thumbnail */}
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 font-anik">
                      Course Image
                    </span>
                  </div>
                )}

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 font-anik">
                    {course.category}
                  </p>

                  <h3 className="text-xl font-bold text-primary font-anik mt-1">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-3 leading-6 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-5">
                    <div>
                      <p className="text-xs text-gray-500 font-anik">
                        Students
                      </p>

                      <p className="font-bold text-primary mt-1">
                        {course.students?.length || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-anik">
                        Lessons
                      </p>

                      <p className="font-bold text-primary mt-1">
                        {course.lessons?.length || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-anik">
                        Price
                      </p>

                      <p className="font-bold text-primary mt-1">
                        ৳ {course.price}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                      to={`/courses/${course._id}`}
                      className="text-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:bg-gray-50 transition"
                    >
                      দেখুন
                    </Link>

                    <Link
                      to={`/instructor/courses/${course._id}/manage`}
                      className="text-center bg-primary text-white px-4 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 transition"
                    >
                      ম্যানেজ
                    </Link>
                  </div>

                  {/* Course Edit/Delete */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <Link
                      to={`/instructor/courses/${course._id}/edit`}
                      className="text-center border border-primary text-primary px-4 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:bg-gray-50 transition"
                    >
                      Edit Course
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteCourse(course._id)
                      }
                      className="border border-red-500 text-red-500 px-4 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:bg-red-50 transition"
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default InstructorDashboard