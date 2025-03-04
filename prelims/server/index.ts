import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import employeeRouter from "./routes/employee"

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()
// config
app.use(express.json())
app.use(cors())

// routes
app.use("/employees", employeeRouter)

app.listen(PORT, () => {
  console.log(`🚀 Listening to ${PORT}`)
})
