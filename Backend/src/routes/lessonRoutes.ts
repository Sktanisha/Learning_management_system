import { Router } from "express"
import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
   updateLesson,
  deleteLesson,
} from "../controllers/lessonController"
import { validate } from "../middleware/validationMiddleware"
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validation/lessonValidation"
import { protect } from "../middleware/authMiddleware"
import { authorize } from "../middleware/roleMiddleware"

const router = Router()

router.get(
  "/courses/:courseId/lessons",
  getLessonsByCourse,
)

router.post(
  "/courses/:courseId/lessons",
  protect,
  authorize("instructor", "admin"),
  validate(createLessonSchema),
  createLesson,
)

router.get("/lessons/:id", getLessonById)

router.put(
  "/lessons/:id",
  protect,
  authorize("instructor", "admin"),
  validate(updateLessonSchema),
  updateLesson,
)

router.delete(
  "/lessons/:id",
  protect,
  authorize("instructor", "admin"),
  deleteLesson,
)

export default router