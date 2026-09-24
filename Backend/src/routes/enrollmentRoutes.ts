import { Router } from "express"

import {
  enrollInCourse,
  getMyEnrollments,
  getEnrollmentByCourse,
  unenrollFromCourse,
  getCourseEnrollments,
} from "../controllers/enrollmentController"
import { validate } from "../middleware/validationMiddleware"
import { enrollSchema } from "../validation/enrollmentValidation"
import { protect } from "../middleware/authMiddleware"

const router = Router()


router.get(
  "/my-courses",
  protect,
  getMyEnrollments,
)

router.get(
  "/:courseId",
  protect,
  getEnrollmentByCourse,
)

router.post(
  "/",
  protect,
  validate(enrollSchema),
  enrollInCourse,
)

router.delete(
  "/:courseId",
  protect,
  unenrollFromCourse,
)

router.get(
  "/course/:courseId/students",
  protect,
  getCourseEnrollments,
)

export default router