import { Router } from "express"
import {
  register,
  login,
  getMe,
} from "../controllers/authController"
import { validate } from "../middleware/validationMiddleware"
import {
    registerSchema,
    loginSchema,
  } from "../validation/authValidation"
import { protect } from "../middleware/authMiddleware"
import { authorize } from "../middleware/roleMiddleware"

const router = Router()

router.post(
  "/register",
  validate(registerSchema),
  register,
)
router.post(
  "/login",
  validate(loginSchema),
  login,
)

router.get("/me", protect, getMe)

router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "You have admin access",
    })
  },
)

export default router