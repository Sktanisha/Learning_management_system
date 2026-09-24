import { Router } from "express"

import {
  getMyProgress,
  completeLesson,
  updateCurrentLesson,
} from "../controllers/progressController"

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
  completeLesson,
)

router.put(
  "/:courseId/lessons/:lessonId/current",
  protect,
  updateCurrentLesson,
)

export default router