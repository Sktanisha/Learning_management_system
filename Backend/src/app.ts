import express from "express"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import courseRoutes from "./routes/courseRoutes"
import lessonRoutes from "./routes/lessonRoutes"
import enrollmentRoutes from "./routes/enrollmentRoutes"
import progressRoutes from "./routes/progressRoutes"
import userRoutes from "./routes/userRoutes"
import { errorMiddleware } from "./middleware/errorMiddleware"

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())
app.use(helmet())

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use("/api", apiLimiter)

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running",
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api", lessonRoutes)
app.use("/api/enrollments", enrollmentRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/users", userRoutes)
app.use(errorMiddleware)

export default app