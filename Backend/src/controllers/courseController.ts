import { Request, Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Course from "../models/Course"

export const createCourse = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const {
      title,
      description,
      thumbnail,
      price,
      category,
    } = req.body

    // 1. Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and category are required",
      })
    }

    // 2. Make sure the authenticated user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    // 3. Create course
    const course = await Course.create({
      title,
      description,
      thumbnail: thumbnail || "",
      price: price || 0,
      category,
      instructor: req.user.userId,
    })

    // 4. Return created course
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    })
  } catch (error) {
    console.error("Create course error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getCourses = async (
  _req: Request,
  res: Response,
) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email profileImage")
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    })
  } catch (error) {
    console.error("Get courses error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getCourseById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    const course = await Course.findById(id)
      .populate("instructor", "name email profileImage")
      /*.populate("lessons", "title description videoUrl duration order") */

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    return res.status(200).json({
      success: true,
      course,
    })
  } catch (error) {
    console.error("Get course error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const updateCourse = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params

    const course = await Course.findById(id)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Only the course instructor or an admin can update it
    if (
      req.user?.role !== "admin" &&
      course.instructor.toString() !== req.user?.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own courses",
      })
    }

    const {
      title,
      description,
      thumbnail,
      price,
      category,
    } = req.body

    // Update only fields that were provided
    if (title !== undefined) course.title = title
    if (description !== undefined) {
      course.description = description
    }
    if (thumbnail !== undefined) {
      course.thumbnail = thumbnail
    }
    if (price !== undefined) course.price = price
    if (category !== undefined) course.category = category

    await course.save()

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    })
  } catch (error) {
    console.error("Update course error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const deleteCourse = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { id } = req.params

    const course = await Course.findById(id)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Only the course instructor or an admin can delete it
    if (
      req.user?.role !== "admin" &&
      course.instructor.toString() !== req.user?.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own courses",
      })
    }

    await Course.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("Delete course error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}