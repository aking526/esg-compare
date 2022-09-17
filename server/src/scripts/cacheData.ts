import fs from "fs";
import company_tickers from "../../data/company_tickers.json";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";
import { config } from "../config/config";
import axios, { AxiosResponse } from "axios";

const ExecFinnhubBatch = async () => {
	const FINNHUB_API_KEY = config.keys.finnhub;

	if (FINNHUB_API_KEY === "") {
		Logging.error("API KEY missing. Get your own key. Website: https://finnhub.io/");
		process.exit(1);
	}

	let c = JSON.parse(fs.readFileSync("./cache/company_info.json").toString());

	let thisd = [];
	for (const ticker of company_tickers) {
		if (ticker in c) continue;
		if (thisd.length >= 60) break;

		thisd.push(ticker);
	}

	if (thisd.length === 0) {
		process.exit(1);
	}

	const getCompanyInfo = async (tickers: string[]) => {
		Logging.log("Fetching company info for: " + tickers.join(" "));
		let data: ISA = {};
		const go = async (ticker: string) => {
			Logging.log("Starting downloading: " + ticker);
			const response: AxiosResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=cbhaajiad3i0blfforp0`);
			data[ticker] = response.data;
			Logging.log("Ending downloading: " + ticker);
		};

		for (let i = 0; i < tickers.length; i++) {
			await go(tickers[i]);
		}

		Logging.log("data fetched");
		return data;
	}

	const finnhub = await getCompanyInfo(thisd);
	for (const ticker in finnhub) {
		c[ticker] = finnhub[ticker];
	}

	fs.writeFileSync("./cache/company_info.json", JSON.stringify(c, null, 4), {});

	setTimeout(() => {
		ExecFinnhubBatch().then(() => null);
	}, 61 * 1000);
}

const ExecEsgBatch = async () => {
	const ESG_API_KEY = config.keys.esg;

	if (ESG_API_KEY === "") {
		Logging.error("API KEY missing. Get your own key. Website: https://www.esgenterprise.com/esg-analytics/esg-api-developer/");
		process.exit(1);
	}

	const esg = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());

	let thisd = [];
	for (const ticker of company_tickers) {
		if (ticker in esg) continue;
		if (thisd.length >= 60) break;

		thisd.push(ticker);
	}

	if (thisd.length === 0) {
		process.exit(1);
	}
};

ExecFinnhubBatch().then(() => null);