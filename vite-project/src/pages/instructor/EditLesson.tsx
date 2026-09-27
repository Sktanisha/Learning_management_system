import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"
import { api } from "../../services/api"

type Lesson = {
  _id: string
  course: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
}
const EditLesson = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState<Lesson | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [duration, setDuration] = useState("")
  const [order, setOrder] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) {
        setError("Lesson ID পাওয়া যায়নি")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const data = await api(`/lessons/${id}`)

        const fetchedLesson: Lesson =
          data.lesson

        setLesson(fetchedLesson)

        setTitle(fetchedLesson.title)
        setDescription(
          fetchedLesson.description || "",
        )
        setVideoUrl(fetchedLesson.videoUrl)
        setDuration(
          String(fetchedLesson.duration),
        )
        setOrder(String(fetchedLesson.order))
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "লেসন লোড করা যায়নি"

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLesson()
  }, [id])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")

    if (!id) {
      setError("Lesson ID পাওয়া যায়নি")
      return
    }

    if (!title.trim()) {
      setError("লেসনের নাম দিন")
      return
    }

    if (!description.trim()) {
      setError("লেসনের description দিন")
      return
    }

    if (!videoUrl.trim()) {
      setError("Video URL দিন")
      return
    }

    if (
      duration === "" ||
      Number(duration) < 0
    ) {
      setError("সঠিক duration দিন")
      return
    }

    if (
      order === "" ||
      Number(order) < 1
    ) {
      setError("সঠিক lesson order দিন")
      return
    }

    try {
      setIsSubmitting(true)

      await api(`/lessons/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          videoUrl: videoUrl.trim(),
          duration: Number(duration),
          order: Number(order),
        }),
      })

      /*
        The lesson response does not need to be
        stored here because we return to the
        Course Management page, which will fetch
        the updated course again.
      */

      if (lesson?.course) {
        navigate(
          `/instructor/courses/${lesson.course}/manage`,
        )
      } else {
        navigate("/instructor/dashboard")
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "লেসন আপডেট করা যায়নি"

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <p className="font-anik text-gray-600">
          লেসন লোড হচ্ছে...
        </p>
      </div>
    )
  }

  if (error && !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">

          <p className="text-red-500 font-anik">
            {error}
          </p>

          <Link
            to="/instructor/dashboard"
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

        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold text-primary font-anik">
              লেসন এডিট করুন
            </h1>

            <p className="text-gray-500 font-anik mt-1">
              লেসনের তথ্য পরিবর্তন করুন
            </p>

          </div>

          <Link
            to={
              lesson?.course
                ? `/instructor/courses/${lesson.course}/manage`
                : "/instructor/dashboard"
            }
            className="text-primary font-anik font-semibold hover:underline"
          >
            ফিরে যান
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8">

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>

              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                লেসনের নাম
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />

            </div>

            {/* Description */}
            <div>

              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
              />

            </div>

            {/* Video URL */}
            <div>

              <label
                htmlFor="videoUrl"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Video URL
              </label>

              <input
                id="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(event) =>
                  setVideoUrl(
                    event.target.value,
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />

            </div>

            {/* Duration + Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Duration */}
              <div>

                <label
                  htmlFor="duration"
                  className="block text-sm font-semibold text-gray-700 font-anik mb-2"
                >
                  Duration (minutes)
                </label>

                <input
                  id="duration"
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(event) =>
                    setDuration(
                      event.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
                />

              </div>

              {/* Order */}
              <div>

                <label
                  htmlFor="order"
                  className="block text-sm font-semibold text-gray-700 font-anik mb-2"
                >
                  Lesson Order
                </label>

                <input
                  id="order"
                  type="number"
                  min="1"
                  value={order}
                  onChange={(event) =>
                    setOrder(
                      event.target.value,
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
                />

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">

                <p className="text-red-600 font-anik">
                  {error}
                </p>

              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-2">

              <Link
                to={
                  lesson?.course
                    ? `/instructor/courses/${lesson.course}/manage`
                    : "/instructor/dashboard"
                }
                className="flex-1 text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-anik font-semibold hover:bg-gray-50"
              >
                বাতিল
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting
                  ? "আপডেট হচ্ছে..."
                  : "লেসন আপডেট করুন"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  )
}

export default EditLesson