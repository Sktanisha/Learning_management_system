import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import courseRoutes from "./routes/courseRoutes"
import lessonRoutes from "./routes/lessonRoutes"
import enrollmentRoutes from "./routes/enrollmentRoutes"

const app = express()

app.use(cors())
app.use(express.json())

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

export default app