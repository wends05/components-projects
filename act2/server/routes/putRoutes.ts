import { Router } from "express";
import { editApplicant } from "../controllers/applicants";

const applicantPutRoutes = Router();

applicantPutRoutes.put("/applicant", editApplicant);

const putRoutes = Router();
putRoutes.use(applicantPutRoutes);

export default putRoutes;
