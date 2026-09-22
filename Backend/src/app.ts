import express from "express"
import cors from "cors"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running",
  })
})

export default app