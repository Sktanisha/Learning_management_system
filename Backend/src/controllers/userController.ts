import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import User from "../models/User"

export const getUsers = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      })
    }

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    })
  } catch (error) {
    console.error("Get users error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getUserById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const userId = String(req.params.id)

    // Users can view their own profile.
    // Admins can view any profile.
    if (
      req.user.userId !== userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      })
    }

    const user = await User.findById(userId)
      .select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get user error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const updateUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    const userId = String(req.params.id)

    if (
      req.user.userId !== userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      })
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const { name, profileImage } = req.body

    if (name !== undefined) {
      user.name = name
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage
    }

    // Only admin can change roles
    if (
      req.user.role === "admin" &&
      req.body.role !== undefined
    ) {
      const allowedRoles = [
        "student",
        "instructor",
        "admin",
      ]

      if (!allowedRoles.includes(req.body.role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role",
        })
      }

      user.role = req.body.role
    }

    await user.save()

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      })
    }

    const userId = String(req.params.id)

    if (userId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      })
    }

    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}