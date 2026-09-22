import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/User"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    //  Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      })
    }

    //  Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      })
    }

    //  Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      })
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //  Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    //  Return user information
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
    }

    // 2. Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // 3. Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // 4. Check JWT secret
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      })
    }

    console.log(
  "Login JWT secret fingerprint:",
  crypto
    .createHash("sha256")
    .update(jwtSecret)
    .digest("hex")
    .slice(0, 12),
)

    // 5. Create JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      },
    )

    // 6. Return token and user
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password",
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error("Get user error:", error)

    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}