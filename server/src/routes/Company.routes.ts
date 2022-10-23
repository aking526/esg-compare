import express from "express";
import companyController from "../controllers/Company.controller";
import { schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

/* CRUD Routes */
router.post("/create/auth=:auth", ValidateSchema(schemas.company.create), companyController.createCompany);
router.get("/get/:ticker&token=:key", companyController.readCompany);
router.get("/get&token:key", companyController.readAll);
router.patch("/update/ticker=:ticker&auth=:auth", ValidateSchema(schemas.company.update), companyController.updateCompany);
router.delete("/delete/ticker=:ticker&auth=:auth", companyController.deleteCompany);
router.delete("/deleteById/id=:id&auth=:auth", companyController.deleteById);

/* Sorting Routes */
router.get("/sort/:metric&token=:key", companyController.readSort);

/* Special Routes */
router.get("/getScores&token=:key", companyController.getScores);
router.get("/getGrades&token=:key", companyController.getGrades);
router.get("/getLevels&token=:key", companyController.getLevels);

router.get("/getNames&token=:key", companyController.readCompanyNames);
router.get("/getIndustries&token=:key", companyController.readIndustries);

/* Fixing routes */
router.get("/tempFixer&auth=:auth", companyController.tempFixer);

export default router;