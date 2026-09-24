import mongoose, { Document, Schema } from "mongoose"

export interface IProgress extends Document {
  student: mongoose.Types.ObjectId
  course: mongoose.Types.ObjectId
  completedLessons: mongoose.Types.ObjectId[]
  currentLesson?: mongoose.Types.ObjectId
  percentage: number
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

const progressSchema = new Schema<IProgress>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    currentLesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// One progress record per student per course
progressSchema.index(
  { student: 1, course: 1 },
  { unique: true },
)

const Progress = mongoose.model<IProgress>(
  "Progress",
  progressSchema,
)

export default Progress