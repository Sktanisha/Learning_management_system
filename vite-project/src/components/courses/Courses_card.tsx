import Merncourse from "../../assets/images/card.png"
import Button from "../ui/Button"
import Flex from "../ui/Flex"
import Image from "../ui/Image"
import { FaStar } from "react-icons/fa"

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

type CoursesCardProps = {
  course: Course
}

const Courses_card = ({ course }: CoursesCardProps) => {
  return (
    <div className="max-w-[377px] font-anik overflow-hidden rounded-[20px]">

      {/* Course Image */}
      <Image
        imgurl={course.thumbnail || Merncourse}
        alt={course.title}
      />

      <div className="bg-secondary text-white px-4 py-2 rounded-b-[20px]">

        <Flex className="justify-between">
          <h4 className="text-sm font-medium">
            {course.category}
          </h4>

          <h5 className="text-sm font-medium">
            {course.students?.length || 0} স্টুডেন্ট
          </h5>
        </Flex>

        {/* Course title */}
        <h2 className="font-bold text-2xl">
          {course.title}
        </h2>

        {/* Rating */}
        <h2 className="font-bold text-sm flex items-center">
          <FaStar className="pr-[5px] text-yellow-400" />
          {course.rating || 0} Rating
        </h2>

        {/* Price */}
        <h2 className="font-bold text-2xl flex justify-between items-center">
          ৳ {course.price} BDT

          <Button
            className="text-xl rounded-[10px] font-semibold py-3 px-[38px] font-anik bg-primary text-white"
            title="বিস্তারিত"
          />
        </h2>

      </div>
    </div>
  )
}

export default Courses_card