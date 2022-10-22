import express, { Request, Response } from "express";
import path from "path";
import Logging from "./utils/Logging";

const app = express();

app.use(express.static(path.join(__dirname, '../../web/build')));

app.get("/*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../web/build', 'index.html'));
});

app.listen(3000, () => Logging.log("Server running on port 3000"));