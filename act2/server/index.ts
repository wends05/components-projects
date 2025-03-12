import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorHandler";
import getRoutes from "./routes/getRoutes";
import postRoutes from "./routes/postRoutes";
import putRoutes from "./routes/putRoutes";
import deleteRoutes from "./routes/deleteRoutes";
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(json());

app.use(getRoutes);
app.use(postRoutes)
app.use(putRoutes)
app.use(deleteRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
