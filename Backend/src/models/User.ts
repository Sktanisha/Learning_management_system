import mongoose, { Document, Schema } from "mongoose"

export type UserRole = "student" | "instructor" | "admin"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model<IUser>("User", userSchema)

export default User