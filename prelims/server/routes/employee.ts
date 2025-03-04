import { Request, Router } from "express";
import { employees } from "../utils/sample_data";

const employeeRouter = Router();

employeeRouter.get("/", async (req: Request, res) => {
  try {
    res.status(200).json(employees);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    res.status(500).json({ error: error, message: errorMessage });
  }
});

export default employeeRouter;
