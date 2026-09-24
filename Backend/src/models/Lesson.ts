import mongoose, { Document, Schema } from "mongoose"

export interface ILesson extends Document {
  course: mongoose.Types.ObjectId
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
  createdAt: Date
  updatedAt: Date
}

const lessonSchema = new Schema<ILesson>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 0,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
)

const Lesson = mongoose.model<ILesson>("Lesson", lessonSchema)

export default Lesson