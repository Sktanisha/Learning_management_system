import mongoose from "mongoose"
import {Request, Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Course from "../models/Course"
import Lesson from "../models/Lesson"

export const createLesson = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const courseId = String(req.params.courseId)
    const {
      title,
      description,
      videoUrl,
      duration,
      order,
    } = req.body

    // 1. Validate course ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    // 2. Validate required fields
    if (
      !title ||
      !videoUrl ||
      duration === undefined ||
      order === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, videoUrl, duration, and order are required",
      })
    }

    // 3. Make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    // 4. Convert course ID string to MongoDB ObjectId
    const courseObjectId = new mongoose.Types.ObjectId(courseId)

    // 5. Find the course
    const course = await Course.findById(courseObjectId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // 6. Only course instructor or admin can add lessons
    if (
      req.user.role !== "admin" &&
      course.instructor.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only add lessons to your own courses",
      })
    }

    // 7. Create lesson
    const lesson = new Lesson({
      course: courseObjectId,
      title,
      description: description || "",
      videoUrl,
      duration,
      order,
    })

    await lesson.save()

    // 8. Add lesson ID to course
    course.lessons.push(
      lesson._id as mongoose.Types.ObjectId,
    )

    await course.save()

    // 9. Return response
    return res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson,
    })
  } catch (error) {
    console.error("Create lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getLessonsByCourse = async (
  req: Request,
  res: Response,
) => {
  try {
    const courseId = String(req.params.courseId)

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    // Make sure the course exists
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Get lessons in order
    const lessons = await Lesson.find({
      course: courseId,
    }).sort({ order: 1 })

    return res.status(200).json({
      success: true,
      count: lessons.length,
      lessons,
    })
  } catch (error) {
    console.error("Get lessons error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getLessonById = async (
  req: Request,
  res: Response,
) => {
  try {
    const lessonId = String(req.params.id)

    // Validate lesson ID
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      })
    }

    // Find lesson
    const lesson = await Lesson.findById(lessonId)

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      })
    }

    return res.status(200).json({
      success: true,
      lesson,
    })
  } catch (error) {
    console.error("Get lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const updateLesson = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const lessonId = String(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      })
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const lesson = await Lesson.findById(lessonId)

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      })
    }

    // Find the course containing this lesson
    const course = await Course.findById(lesson.course)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Only the course instructor or admin can update the lesson
    if (
      req.user.role !== "admin" &&
      course.instructor.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update lessons in your own courses",
      })
    }

    const {
      title,
      description,
      videoUrl,
      duration,
      order,
    } = req.body

    if (title !== undefined) lesson.title = title
    if (description !== undefined) {
      lesson.description = description
    }
    if (videoUrl !== undefined) {
      lesson.videoUrl = videoUrl
    }
    if (duration !== undefined) {
      lesson.duration = duration
    }
    if (order !== undefined) {
      lesson.order = order
    }

    await lesson.save()

    return res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson,
    })
  } catch (error) {
    console.error("Update lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const deleteLesson = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const lessonId = String(req.params.id)

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      })
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const lesson = await Lesson.findById(lessonId)

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      })
    }

    const course = await Course.findById(lesson.course)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Only the course instructor or admin can delete the lesson
    if (
      req.user.role !== "admin" &&
      course.instructor.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete lessons in your own courses",
      })
    }

    await Lesson.findByIdAndDelete(lessonId)

    // Remove lesson ID from the course
    course.lessons = course.lessons.filter(
      (id) => id.toString() !== lessonId,
    )

    await course.save()

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    })
  } catch (error) {
    console.error("Delete lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}