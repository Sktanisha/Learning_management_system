import { Router } from "express"
import { createCourse,
        getCourses,
        getCourseById,
        updateCourse,
        deleteCourse,
 } from "../controllers/courseController"
 import { validate } from "../middleware/validationMiddleware"
import {
  createCourseSchema,
  updateCourseSchema,
} from "../validation/courseValidation"
import { protect } from "../middleware/authMiddleware"
import { authorize } from "../middleware/roleMiddleware"

const router = Router()

router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  validate(createCourseSchema),
  createCourse,
)
router.get("/", getCourses)
router.get("/:id", getCourseById)
router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  validate(updateCourseSchema),
  updateCourse,
)
router.delete(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  deleteCourse,
)

export default router