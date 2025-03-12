import { Router } from "express";
import { getAllApplicants, getApplicant } from "../controllers/applicants";
const applicantGetRoutes = Router();

applicantGetRoutes
  .get("/applicant/:id", getApplicant)
  .get("/applicants", getAllApplicants);

const getRoutes = Router();

getRoutes.use(applicantGetRoutes);

export default getRoutes;
