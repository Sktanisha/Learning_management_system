import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"
import { api } from "../../services/api"

type Course = {
  _id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  category: string
}

const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [course, setCourse] = useState<Course | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError("Course ID পাওয়া যায়নি")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const data = await api(`/courses/${id}`)

        const fetchedCourse: Course = data.course

        setCourse(fetchedCourse)

        setTitle(fetchedCourse.title)
        setDescription(fetchedCourse.description)
        setCategory(fetchedCourse.category)
        setPrice(String(fetchedCourse.price))
        setThumbnail(fetchedCourse.thumbnail || "")
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")

    if (!id) {
      setError("Course ID পাওয়া যায়নি")
      return
    }

    if (!title.trim()) {
      setError("কোর্সের নাম দিন")
      return
    }

    if (title.trim().length < 3) {
      setError("কোর্সের নাম কমপক্ষে ৩ অক্ষরের হতে হবে")
      return
    }

    if (!description.trim()) {
      setError("কোর্সের description দিন")
      return
    }

    if (!category.trim()) {
      setError("কোর্সের category দিন")
      return
    }

    if (price === "" || Number(price) < 0) {
      setError("সঠিক price দিন")
      return
    }

    try {
      setIsSubmitting(true)

      await api(`/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          price: Number(price),
          thumbnail: thumbnail.trim(),
        }),
      })

      navigate(
        `/instructor/courses/${id}/manage`,
      )
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "কোর্স আপডেট করা যায়নি"

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <p className="font-anik text-gray-600">
          কোর্স লোড হচ্ছে...
        </p>
      </div>
    )
  }

  if (error && !course) {
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
              কোর্স এডিট করুন
            </h1>

            <p className="text-gray-500 font-anik mt-1">
              কোর্সের তথ্য পরিবর্তন করুন
            </p>
          </div>

          <Link
            to={
              id
                ? `/instructor/courses/${id}/manage`
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
                কোর্সের নাম
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
                  setDescription(event.target.value)
                }
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Category
              </label>

              <input
                id="category"
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Price
              </label>

              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Thumbnail URL
              </label>

              <input
                id="thumbnail"
                type="url"
                value={thumbnail}
                onChange={(event) =>
                  setThumbnail(event.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />

              {thumbnail && (
                <div className="mt-4">
                  <img
                    src={thumbnail}
                    alt="Course thumbnail preview"
                    className="w-full max-w-sm h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-anik">
                  {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <Link
                to={
                  id
                    ? `/instructor/courses/${id}/manage`
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
                  : "কোর্স আপডেট করুন"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default EditCourse