import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { config } from "../config/config";
import Logging from "../utils/Logging";

const getStockInfo = async (req: Request, res: Response, next: NextFunction ) => {
	const companyTicker = req.params.ticker;

	try {
		const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${companyTicker}&outputsize=full&apikey=${config.keys.av}`;
		const avRes = await axios.get(url);
		const data = avRes.data;

		return res.status(200).json( data );
	} catch (e) {
		Logging.log(e);
		return res.status(500).json({ e });
	}
};

export default { getStockInfo };