import express from "express";
import companyController from "../controllers/Company.controller";
import { schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

/* CRUD Routes */
router.post("/create/auth=:auth", ValidateSchema(schemas.company.create), companyController.createCompany);
router.get("/get/:ticker", companyController.readCompany);
router.get("/get/", companyController.readAll);
router.patch("/update/ticker=:ticker&auth=:auth", ValidateSchema(schemas.company.update), companyController.updateCompany);
router.delete("/delete/ticker=:ticker&auth=:auth", companyController.deleteCompany);
router.delete("/deleteById/id=:id&auth=:auth", companyController.deleteById);

/* Sorting Routes */
router.get("/sort/:metric", companyController.readSort);

/* Special Routes */
router.get("/getScores", companyController.getScores);
router.get("/getGrades", companyController.getGrades);
router.get("/getLevels", companyController.getLevels);

router.get("/getNames/", companyController.readCompanyNames);
router.get("/getIndustries/", companyController.readIndustries);

export default router;