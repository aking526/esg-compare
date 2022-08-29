import express from "express";
import stockInfoController from "../controllers/StockInfo.controller";

const router = express.Router();

router.get("/get/:ticker", stockInfoController.getStockInfo);


export default router;