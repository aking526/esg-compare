import express from "express";
import stockInfoController from "../controllers/StockInfo.controller";

const router = express.Router();

router.get("/get/symbol=:ticker&resolution=:resolution&from=:from&to=:to&token=:key", stockInfoController.getStockInfo);
router.get("/getQuote/:ticker&token=:key", stockInfoController.getQuote);
router.get("/getBasicFinancials/:ticker&token=:key", stockInfoController.getBasicFinancials);

router.get("/getNews/:ticker/from=:from&to=:to&token=:key", stockInfoController.getNews);

export default router;