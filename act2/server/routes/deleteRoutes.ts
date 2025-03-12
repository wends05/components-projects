import { Router } from "express";
import { deleteApplicant } from "../controllers/applicants";

const applicantDeleteRoutes = Router();

applicantDeleteRoutes.delete("/applicant/:id", deleteApplicant);

const deleteRoutes = Router();
deleteRoutes.use(applicantDeleteRoutes);

export default deleteRoutes;
