import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    return next();
  }

  console.error(error);
  res.status(500).send({
    error: error,
    message: error.message,
  });
  return;
};
