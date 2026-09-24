import { Router } from "express"

import {
  getMyProgress,
  completeLesson,
  updateCurrentLesson,
} from "../controllers/progressController"
import { validate } from "../middleware/validationMiddleware"
import { progressParamsSchema } from "../validation/progressValidation"
import { protect } from "../middleware/authMiddleware"

const router = Router()

router.get(
  "/:courseId",
  protect,
  getMyProgress,
)

router.post(
  "/:courseId/lessons/:lessonId/complete",
  protect,
  validate(progressParamsSchema),
  completeLesson,
)

router.put(
  "/:courseId/lessons/:lessonId/current",
  protect,
  validate(progressParamsSchema),
  updateCurrentLesson,
)

export default router