import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { useAuth } from "../../context/AuthContext"

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
  lessons?: Lesson[]
}

const LearningPage = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)
  const [selectedLesson, setSelectedLesson] =
    useState<Lesson | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return

      try {
        setIsLoading(true)

        const data = await api(`/courses/${id}`)

        setCourse(data.course)

        if (data.course.lessons?.length > 0) {
          setSelectedLesson(data.course.lessons[0])
        }
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

    fetchCourse()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-anik text-gray-600">
          কোর্স লোড হচ্ছে...
        </p>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-anik">
            {error || "কোর্স পাওয়া যায়নি"}
          </p>

          <Link
            to="/student/dashboard"
            className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik"
          >
            ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-primary font-anik">
              {course.title}
            </h1>

            <p className="text-sm text-gray-500 font-anik mt-1">
              স্বাগতম, {user?.name}
            </p>
          </div>

          <Link
            to="/student/dashboard"
            className="text-primary font-anik font-semibold"
          >
            ড্যাশবোর্ড
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">

          {/* Lesson Viewer */}
          <div>

            <div className="bg-black rounded-xl overflow-hidden aspect-video">

              {selectedLesson?.videoUrl ? (
                <video
                  key={selectedLesson._id}
                  controls
                  className="w-full h-full"
                  src={selectedLesson.videoUrl}
                >
                  আপনার ব্রাউজার ভিডিও চালাতে পারে না।
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p className="font-anik">
                    কোনো ভিডিও পাওয়া যায়নি
                  </p>
                </div>
              )}

            </div>

            {/* Selected Lesson */}
            {selectedLesson && (
              <div className="bg-white rounded-xl shadow-sm p-6 mt-5">

                <p className="text-sm text-gray-500 font-anik">
                  Lesson {selectedLesson.order}
                </p>

                <h2 className="text-2xl font-bold text-primary font-anik mt-1">
                  {selectedLesson.title}
                </h2>

                <p className="text-gray-600 mt-4 leading-7">
                  {selectedLesson.description}
                </p>

                <p className="text-sm text-gray-500 mt-4">
                  Duration: {selectedLesson.duration} minutes
                </p>

              </div>
            )}

          </div>

          {/* Lesson List */}
          <aside className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="p-5 border-b">
              <h2 className="text-xl font-bold text-primary font-anik">
                কোর্সের লেসন
              </h2>

              <p className="text-sm text-gray-500 font-anik mt-1">
                {course.lessons?.length || 0} টি লেসন
              </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">

              {course.lessons &&
              course.lessons.length > 0 ? (
                course.lessons.map((lesson) => {

                  const isSelected =
                    selectedLesson?._id === lesson._id

                  return (
                    <button
                      key={lesson._id}
                      onClick={() =>
                        setSelectedLesson(lesson)
                      }
                      className={`w-full text-left p-4 border-b cursor-pointer transition ${
                        isSelected
                          ? "bg-primary text-white"
                          : "hover:bg-gray-50"
                      }`}
                    >

                      <div className="flex gap-3">

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isSelected
                              ? "bg-white text-primary"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {lesson.order}
                        </div>

                        <div className="flex-1">

                          <p className="font-semibold font-anik">
                            {lesson.title}
                          </p>

                          <p
                            className={`text-xs mt-1 ${
                              isSelected
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {lesson.duration} মিনিট
                          </p>

                        </div>

                      </div>

                    </button>
                  )
                })
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 font-anik">
                    এই কোর্সে এখনো কোনো লেসন নেই।
                  </p>
                </div>
              )}

            </div>

          </aside>

        </div>

      </main>
    </div>
  )
}

export default LearningPage