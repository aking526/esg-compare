import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { config } from "../config/config";
import Logging from "../utils/Logging";

const getStockInfo = async (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;
	const resolution = req.params.resolution;
	const from = req.params.from;
	const to = req.params.to;

	try {
		const url = `https://finnhub.io/api/v1/stock/candle?symbol=${companyTicker.toUpperCase()}&resolution=${resolution}&from=${from}&to=${to}&token=${config.keys.finnhub}`;
		const fRes = await axios.get(url);
		const data = fRes.data;

		return res.status(200).json(data);
	} catch (e) {
		Logging.error(e);
		return res.status(500).json({ e });
	}
};

const getNews = async (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;
	const from = req.params.from;
	const to = req.params.to;

	try {
		const url = `https://finnhub.io/api/v1/company-news?symbol=${companyTicker}&from=${from}&to=${to}&token=${config.keys.finnhub}`;
		const fRes = await axios.get(url);
		const data = fRes.data;

		return res.status(200).json(data);
	} catch (e) {
		Logging.log(e);
		return res.status(500).json({ e });
	}
};

export default { getStockInfo, getNews };