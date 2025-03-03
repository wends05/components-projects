import express from "express"
import cors from "cors"
import postRouter from "./routers/postRoutes"
import dotenv from "dotenv";

dotenv.config()
const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  console.log("Hello world!")
  res.json("Hello world!")
})

app.use(postRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
