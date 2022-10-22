import express, {NextFunction, Request, Response} from "express";
import companyRoutes from "./Company.routes";
import stockRoutes from "./StockInfo.routes";

const router = express.Router();

// Routes
router.use("/companies", companyRoutes);
router.use("/stockInfo", stockRoutes);

// Healthcheck
router.get("/healthcheck", (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: "working" }));

export default router;