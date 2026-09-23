import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    role: "student" | "instructor" | "admin"
  }
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      })
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1]

    // 3. Check JWT secret
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      })
    }

    // Temporary debugging fingerprint
    /* console.log(
      "Middleware JWT secret fingerprint:",
      crypto
        .createHash("sha256")
        .update(jwtSecret)
        .digest("hex")
        .slice(0, 12),
    ) */

    // 4. Verify token
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string
      role: "student" | "instructor" | "admin"
    }

    // 5. Attach user information to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    }

    // 6. Continue to protected route
    next()
  } catch (error) {
    console.error("JWT verification error:", error)

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}