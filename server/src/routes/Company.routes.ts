import express from "express";
import companyController from "../controllers/Company.controller";
import { schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

/* CRUD Routes */
router.post("/create/", ValidateSchema(schemas.company.create), companyController.createCompany);
router.get("/get/:ticker", companyController.readCompany);
router.get("/get/", companyController.readAll);
router.patch("/update/:ticker", ValidateSchema(schemas.company.update), companyController.updateCompany);
router.delete("/delete/:ticker", companyController.deleteCompany);

/* Special Routes */
router.get("/getNames/", companyController.readCompanyNames);


/* Sorting Routes */
router.get("/sort/:metric", companyController.readSort);

export default router;