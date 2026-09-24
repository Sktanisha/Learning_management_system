import mongoose from "mongoose"
import { Request,Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import Enrollment from "../models/Enrollment"
import Course from "../models/Course"

export const enrollInCourse = async (
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

    // Only students can enroll
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in courses",
      })
    }

    const courseId = String(req.body.courseId)

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      })
    }

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    const existingEnrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course",
      })
    }

    const enrollment = await Enrollment.create({
      student: req.user.userId,
      course: courseId,
    })

    // Add student to course
    if (
      !course.students.some(
        (studentId) =>
          studentId.toString() === req.user?.userId,
      )
    ) {
      course.students.push(
        new mongoose.Types.ObjectId(req.user.userId),
      )

      await course.save()
    }

    return res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    })
  } catch (error) {
    console.error("Enrollment error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getMyEnrollments = async (
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

    const enrollments = await Enrollment.find({
      student: req.user.userId,
    })
      .populate(
        "course",
        "title description thumbnail price category rating instructor",
      )
      .sort({ enrolledAt: -1 })

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    })
  } catch (error) {
    console.error("Get my enrollments error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getEnrollmentByCourse = async (
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

    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    }).populate(
      "course",
      "title description thumbnail price category rating instructor",
    )

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    return res.status(200).json({
      success: true,
      enrollment,
    })
  } catch (error) {
    console.error("Get enrollment by course error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const unenrollFromCourse = async (
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

    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    })

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course",
      })
    }

    await Enrollment.findByIdAndDelete(enrollment._id)

    // Remove student from course.students
    const course = await Course.findById(courseId)

    if (course) {
      course.students = course.students.filter(
        (studentId) =>
          studentId.toString() !== req.user?.userId,
      )

      await course.save()
    }

    return res.status(200).json({
      success: true,
      message: "Unenrolled successfully",
    })
  } catch (error) {
    console.error("Unenrollment error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getCourseEnrollments = async (
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

    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    // Only course instructor or admin can view enrollment list
    const isInstructor =
      course.instructor.toString() === req.user.userId

    const isAdmin = req.user.role === "admin"

    if (!isInstructor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      })
    }

    const enrollments = await Enrollment.find({
      course: courseId,
    })
      .populate(
        "student",
        "name email profileImage role",
      )
      .sort({ enrolledAt: -1 })

    return res.status(200).json({
      success: true,
      course: {
        id: course._id,
        title: course.title,
      },
      count: enrollments.length,
      enrollments,
    })
  } catch (error) {
    console.error("Get course enrollments error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}