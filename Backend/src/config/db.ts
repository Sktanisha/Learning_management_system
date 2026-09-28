import mongoose from "mongoose"

let connectionPromise: Promise<typeof mongoose> | null = null

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured")
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 10000,
      },
    )
  }

  try {
    const connection = await connectionPromise

    console.log(
      `MongoDB connected: ${connection.connection.host}`,
    )

    return connection
  } catch (error) {
    connectionPromise = null

    console.error(
      "MongoDB connection failed:",
      error,
    )

    throw error
  }
}

export default connectDB