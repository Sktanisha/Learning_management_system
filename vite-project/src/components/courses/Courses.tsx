import { useEffect, useState } from "react"

import Container from "../common/Container"
import Button from "../ui/Button"
import Title from "../ui/Title"
import Courses_card from "./Courses_card"
import { api } from "../../services/api"

type Course = {
  _id: string
  title: string
  description: string
  thumbnail?: string
  price: number
  category: string
  rating: number
  students?: string[]
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)

        const data = await api("/courses")

        setCourses(data.courses || [])
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

    fetchCourses()
  }, [])

  return (
    <div>
      <section className="mt-[180px]"></section>

      <Container>

        <Title
          maintitle="আমাদের কোর্স সমুহ"
          subtitle="আমাদের সমস্ত কোর্স সুদক্ষ মেন্টর দ্বারা পরিচালিত এবং সমৃদ্ধ রিসোর্স দ্বারা পরিপূর্ণ"
        />

        <div className="mt-[62px]">

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-10 font-anik">
              <p className="text-gray-600">
                কোর্স লোড হচ্ছে...
              </p>
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div className="text-center py-10 font-anik">
              <p className="text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* No courses */}
          {!isLoading &&
            !error &&
            courses.length === 0 && (
              <div className="text-center py-10 font-anik">
                <p className="text-gray-600">
                  বর্তমানে কোনো কোর্স পাওয়া যায়নি।
                </p>
              </div>
            )}

          {/* Courses */}
          {!isLoading &&
            !error &&
            courses.length > 0 && (
              <div className="grid grid-cols-3 gap-4">

                {courses.slice(0, 6).map((course) => (
                  <Courses_card
                    key={course._id}
                    course={course}
                  />
                ))}

              </div>
            )}

          {/* More Courses */}
          {!isLoading &&
            !error &&
            courses.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button
                  className="text-xl rounded-[10px] font-semibold py-2 px-[38px] font-anik bg-[#7890AE] text-white"
                  title="আরও কোর্স দেখুন"
                />
              </div>
            )}

        </div>

      </Container>
    </div>
  )
}

export default Courses