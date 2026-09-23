import mongoose, { Document, Schema } from "mongoose"

export interface ICourse extends Document {
  title: string
  description: string
  thumbnail?: string
  price: number
  category: string
  instructor: mongoose.Types.ObjectId
  lessons: mongoose.Types.ObjectId[]
  rating: number
  students: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Course = mongoose.model<ICourse>("Course", courseSchema)

export default Course