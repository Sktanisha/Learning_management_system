import { Request, Response, NextFunction } from "express"

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Server error:", err)

  const statusCode = err.statusCode || 500

  return res.status(statusCode).json({
    success: false,
    message:
      err.message || "Internal server error",
  })
}