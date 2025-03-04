import { Router } from "express";
import prisma from "../../prisma/prisma";
import { size } from "@prisma/client";

const postRouter = Router();

interface CardForm {
  title: string;
  content: string;
  size: size;
}

postRouter.post("/cards", async (req, res, next) => {
  try {
    const cardForm = req.body;
    console.log(cardForm);

    if (
      cardForm.size !== "SMALL" &&
      cardForm.size !== "MEDIUM" &&
      cardForm.size !== "LARGE"
    ) {
      throw new Error("Invalid size");
    }
    if (!cardForm.title || !cardForm.content || !cardForm.size) {
      throw new Error("Missing required fields");
    }

    const card = await prisma.card.create({
      data: cardForm,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message: errorMessage, error });
  }
});

export default postRouter;
