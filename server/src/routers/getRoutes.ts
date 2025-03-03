import { Router } from "express";
import prisma from "../../prisma/prisma";

const getRouter = Router();

getRouter.get("/cards", async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default getRouter;
