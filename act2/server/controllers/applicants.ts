import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { Applicant } from "@prisma/client";

export const getAllApplicants = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicants = await prisma.applicant.findMany();
    res.status(200).json(applicants);
  } catch (error) {
    next(error);
  }
};
export const getApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    const applicants = await prisma.applicant.findFirst({
      where: {
        id,
      },
    });
    res.status(200).json(applicants);
  } catch (error) {
    next(error);
  }
};

export const postApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      role,
      groupName,
      expectedDateOfDefense,
      expectedSalary,
    } = req.body as Applicant;

    const applicant = await prisma.applicant.create({
      data: {
        firstName,
        lastName,
        role,
        groupName,
        expectedDateOfDefense,
        expectedSalary,
      },
    });
    res.status(201).json(applicant);
  } catch (error) {
    next(error);
  }
};

export const postApplicants = async (
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    const applicants = req.body as Applicant[]

    if (!Array.isArray(applicants) || applicants.length == 0) {
      throw Error("Request Body is not valid")
    }

    const createdApplicants = await prisma.applicant.createManyAndReturn({
      data: applicants
    })

    res.status(200).json(createdApplicants)
  } catch (error) {
    next(error)
  }
}

export const editApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      role,
      groupName,
      expectedDateOfDefense,
      expectedSalary,
    } = req.body as Applicant;

    const applicant = await prisma.applicant.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        role,
        groupName,
        expectedDateOfDefense,
        expectedSalary,
      },
    });

    res.status(200).json(applicant);
  } catch (error) {
    next(error);
  }
};

export const deleteApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const applicant = await prisma.applicant.delete({
      where: {
        id,
      },
    });
    res.status(200).json({applicant})
  } catch (error) {
    next(error);
  }
};
