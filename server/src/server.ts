import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose, { Error } from "mongoose";
import { config } from "./config/config";
import Logging from "./utils/Logging";
import companyRoutes from "./routes/Company.routes";
import stockRoutes from "./routes/StockInfo.routes";

export const app = express();

// Connect to Mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
	.then(() => {
		Logging.info("Connected to mongoDB");
		StartServer();
	})
	.catch((error: Error) => {
		Logging.error("Unable to connect: ");
		Logging.error(error);
	});

const StartServer = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }))

	app.use((req: Request, res: Response, next: NextFunction) => {
		// Log the request
		Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on("finish", () => {
			// Log the response
			Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
		});

		next();
	});

	// Rules of API
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

		if (req.method == "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}

		next();
	});

	// Routes
	app.use("/api/companies", companyRoutes);
	app.use("/api/stockInfo", stockRoutes);

	// Healthcheck
	app.get("/healthcheck", (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: "working" }));

	// Error handling
	app.use((req: Request, res: Response, next: NextFunction) => { // Returns error when on localhost:8000
		// const error = new Error("not found");
		Logging.error("not found");

		return res.status(404).json({ message: "not found" });
	});

	http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port: ${config.server.port}`));
};
