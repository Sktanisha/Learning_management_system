import mongoose, { Document, Schema } from "mongoose"

export interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId
  course: mongoose.Types.ObjectId
  enrolledAt: Date
  progress: number
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

const enrollmentSchema = new Schema<IEnrollment>(
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

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    progress: {
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

// A student can enroll in a course only once
enrollmentSchema.index(
  { student: 1, course: 1 },
  { unique: true },
)

const Enrollment = mongoose.model<IEnrollment>(
  "Enrollment",
  enrollmentSchema,
)

export default Enrollment