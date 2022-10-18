import express from "express";
import stockInfoController from "../controllers/StockInfo.controller";

const router = express.Router();

router.get("/get/symbol=:ticker&resolution=:resolution&from=:from&to=:to", stockInfoController.getStockInfo);
router.get("/getQuote/:ticker", stockInfoController.getQuote);
router.get("/getBasicFinancials/:ticker", stockInfoController.getBasicFinancials);

router.get("/getNews/:ticker/from=:from&to=:to", stockInfoController.getNews);

export default router;