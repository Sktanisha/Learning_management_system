import mongoose from "mongoose"
import { Response } from "express"

import { AuthRequest } from "../middleware/authMiddleware"

import Progress from "../models/Progress"
import Enrollment from "../models/Enrollment"
import Course from "../models/Course"
import Lesson from "../models/Lesson"

export const getMyProgress = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const courseId = String(req.params.courseId)

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    // Student must be enrolled
    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    let progress = await Progress.findOne({
      student: req.user.userId,
      course: courseId,
    })
      .populate("completedLessons", "title order duration")
      .populate("currentLesson", "title description videoUrl duration order")

    // Create progress automatically if it doesn't exist
    if (!progress) {
      progress = await Progress.create({
        student: req.user.userId,
        course: courseId,
      })
    }

    return res.status(200).json({
      success: true,
      progress,
    })
  } catch (error) {
    console.error("Get progress error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}
export const completeLesson = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const courseId = String(req.params.courseId)
    const lessonId = String(req.params.lessonId)

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      })
    }

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    // Check course
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Check lesson
    const lesson = await Lesson.findOne({
      _id: lessonId,
      course: courseId,
    })

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found in this course",
      })
    }

    // Find or create progress
    let progress = await Progress.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!progress) {
      progress = new Progress({
        student: req.user.userId,
        course: courseId,
      })
    }

    // Add lesson only if not already completed
    const alreadyCompleted = progress.completedLessons.some(
      (id) => id.toString() === lessonId,
    )

    if (!alreadyCompleted) {
      progress.completedLessons.push(
        new mongoose.Types.ObjectId(lessonId),
      )
    }

    progress.currentLesson = new mongoose.Types.ObjectId(
      lessonId,
    )

    // Calculate percentage
    const totalLessons = course.lessons.length
    const completedLessons =
      progress.completedLessons.length

    if (totalLessons > 0) {
      progress.percentage = Math.round(
        (completedLessons / totalLessons) * 100,
      )
    } else {
      progress.percentage = 0
    }

    // Course completed
    if (
      totalLessons > 0 &&
      completedLessons >= totalLessons
    ) {
      progress.percentage = 100
      progress.completed = true
    }

    await progress.save()

    // Keep Enrollment progress synchronized
    enrollment.progress = progress.percentage
    enrollment.completed = progress.completed

    await enrollment.save()

    return res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
      progress,
    })
  } catch (error) {
    console.error("Complete lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const updateCurrentLesson = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const courseId = String(req.params.courseId)
    const lessonId = String(req.params.lessonId)

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      })
    }

    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    const lesson = await Lesson.findOne({
      _id: lessonId,
      course: courseId,
    })

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found in this course",
      })
    }

    let progress = await Progress.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!progress) {
      progress = new Progress({
        student: req.user.userId,
        course: courseId,
      })
    }

    progress.currentLesson =
      new mongoose.Types.ObjectId(lessonId)

    await progress.save()

    return res.status(200).json({
      success: true,
      message: "Current lesson updated",
      progress,
    })
  } catch (error) {
    console.error("Update current lesson error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}