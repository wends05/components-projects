import { Router } from "express";
import prisma from "../../prisma/prisma";

const getRouter = Router();

getRouter.get("/cards", async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default getRouter;
