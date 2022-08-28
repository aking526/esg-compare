import express from "express";
import controller from "../controllers/Company.controller";
import { schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

/* CRUD Routes */
router.post("/create/", ValidateSchema(schemas.company.create), controller.createCompany);
router.get("/get/:ticker", controller.readCompany);
router.get("/get/", controller.readAll);
router.patch("/update/:ticker", ValidateSchema(schemas.company.update), controller.updateCompany);
router.delete("/delete/:ticker", controller.deleteCompany);


/* Sorting Routes */
router.get("/sort/:metric", controller.readSort);

export default router;