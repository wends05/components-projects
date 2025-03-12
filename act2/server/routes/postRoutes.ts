import { Router } from "express";
import { postApplicant, postApplicants } from "../controllers/applicants";

const applicantPostRoutes = Router();

applicantPostRoutes
  .post("/applicant", postApplicant)
  .post("/applicants", postApplicants);

const postRoutes = Router();
postRoutes.use(applicantPostRoutes);

export default postRoutes;
