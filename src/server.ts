import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"

dotenv.config()

const app = express()
app.use(express.json())

//Routes
app.use('/api/auth', userRoutes)
app.use('/api/project', projectRoutes)

export default app