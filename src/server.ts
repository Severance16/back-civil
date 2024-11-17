import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"
import { corsConfig } from "./configs/cors"

dotenv.config()

const app = express()
app.use(cors(corsConfig))
app.use(express.json())

//Routes
app.use('/api/auth', userRoutes)
app.use('/api/project', projectRoutes)

export default app