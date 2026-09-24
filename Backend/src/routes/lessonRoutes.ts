import { Router } from "express"
import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
   updateLesson,
  deleteLesson,
} from "../controllers/lessonController"
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
  createLesson,
)

router.get("/lessons/:id", getLessonById)

router.put(
  "/lessons/:id",
  protect,
  authorize("instructor", "admin"),
  updateLesson,
)

router.delete(
  "/lessons/:id",
  protect,
  authorize("instructor", "admin"),
  deleteLesson,
)

export default router