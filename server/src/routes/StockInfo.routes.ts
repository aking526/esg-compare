import express from "express";
import stockInfoController from "../controllers/StockInfo.controller";

const router = express.Router();

router.get("/get/symbol=:ticker&resolution=:resolution&from=:from&to=:to", stockInfoController.getStockInfo);
router.get("/getNews/:ticker/:topics", stockInfoController.getNews);

export default router;