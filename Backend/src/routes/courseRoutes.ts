import { Router } from "express"
import { createCourse,
        getCourses,
        getCourseById,
        updateCourse,
 } from "../controllers/courseController"
import { protect } from "../middleware/authMiddleware"
import { authorize } from "../middleware/roleMiddleware"

const router = Router()

router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  createCourse,
)
router.get("/", getCourses)
router.get("/:id", getCourseById)
router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  updateCourse,
)

export default router