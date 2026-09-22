import { Router } from "express"
import {register,
        login, 
        getMe,} from "../controllers/authController"
import { protect } from "../middleware/authMiddleware"

const router = Router()

//POST /api/auth/register

router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, getMe)

export default router