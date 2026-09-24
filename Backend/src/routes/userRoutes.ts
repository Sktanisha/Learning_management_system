import { Router } from "express"

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController"

import { protect } from "../middleware/authMiddleware"

const router = Router()

// Get all users
router.get(
  "/",
  protect,
  getUsers,
)

// Get user by ID
router.get(
  "/:id",
  protect,
  getUserById,
)

// Update user
router.put(
  "/:id",
  protect,
  updateUser,
)

// Delete user
router.delete(
  "/:id",
  protect,
  deleteUser,
)

export default router