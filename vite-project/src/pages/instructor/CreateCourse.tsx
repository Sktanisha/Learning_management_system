import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../services/api"

const CreateCourse = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("কোর্সের নাম দিন")
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

      const data = await api("/courses", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          thumbnail: thumbnail.trim(),
          price: Number(price),
          category: category.trim(),
        }),
      })

      setSuccess(
        data.message || "কোর্স সফলভাবে তৈরি হয়েছে",
      )

      // Clear form
      setTitle("")
      setDescription("")
      setThumbnail("")
      setPrice("")
      setCategory("")

      // Go back to instructor dashboard
      setTimeout(() => {
        navigate("/instructor/dashboard")
      }, 1000)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "কোর্স তৈরি করা যায়নি"

      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-primary font-anik">
              নতুন কোর্স তৈরি করুন
            </h1>

            <p className="text-gray-500 font-anik mt-1">
              আপনার নতুন কোর্সের তথ্য দিন
            </p>
          </div>

          <Link
            to="/instructor/dashboard"
            className="text-primary font-anik font-semibold hover:underline"
          >
            Dashboard
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
                placeholder="যেমন: MERN Stack Development"
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
                placeholder="কোর্স সম্পর্কে বিস্তারিত লিখুন..."
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
                placeholder="যেমন: Web Development"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 font-anik mb-2"
              >
                Price (BDT)
              </label>

              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="যেমন: 2500"
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
                placeholder="https://example.com/course-image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary"
              />

              <p className="text-xs text-gray-500 mt-2">
                একটি image URL দিতে পারেন। না দিলে default image ব্যবহার হবে।
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-anik">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600 font-anik">
                  {success}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-2">

              <Link
                to="/instructor/dashboard"
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
                  ? "কোর্স তৈরি হচ্ছে..."
                  : "কোর্স তৈরি করুন"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  )
}

export default CreateCourse