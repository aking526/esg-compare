import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose, { Error } from "mongoose";
import { config } from "./config/config";
import Logging from "./utils/Logging";
import path from "path";
import apiRoutes from "./routes/apiRoutes";

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

	// Incorporate Frontend
	app.use(express.static(path.join(__dirname, '../../../web/build')));

	app.get("/*", (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, '../../../web/build', 'index.html'));
	});

	app.use("/api", apiRoutes);

	// Error handling
	app.use((req: Request, res: Response, next: NextFunction) => { // Returns error when on localhost:8000
		// const error = new Error("not found");
		Logging.error("not found");

		return res.status(404).json({ message: "not found" });
	});

	http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port: ${config.server.port}`));
};
