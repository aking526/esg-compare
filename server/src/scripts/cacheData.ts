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
			const response: AxiosResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`);
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

const ExecEsgBatch = async (dayCnt: number, customList: string[] | undefined) => {
	const ESG_API_KEY = config.keys.esg;

	if (ESG_API_KEY === "") {
		Logging.error("API KEY missing. Get your own key. Website: https://www.esgenterprise.com/esg-analytics/esg-api-developer/");
		process.exit(1);
	}

	if (dayCnt === 50) {
		Logging.log(`50 API Calls made. Wait 24 hours. Current time: ${new Date().toLocaleString()}`);
		process.exit(1);
	}

	const e = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());

	const getNewList = (list: string[]) => {
		let arr = [];
		for (const ticker in list) {
			if (ticker in e) continue;
			if (arr.length >= 50) break;

			arr.push(ticker);
		}

		return arr;
	};

	let thisd = getNewList(company_tickers);
	if (customList) thisd = customList;

	if (thisd.length === 0) {
		process.exit(1);
	}

	const getESGData = async (tickers: string[]) => {
		Logging.log("Fetching ESG data for: " + tickers.join(" "));
		const response: AxiosResponse = await axios.get("https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=" +
				tickers.join(",") +
				"&token=" + ESG_API_KEY
		);
		const req = response.data;

		let data: ISA = {};
		for (let i = 0; i < tickers.length; i++) {
			data[tickers[i]] = req[i];
		}

		Logging.log("Download complete.");
		return data;
	};

	const esg = await getESGData(thisd);
	for (const ticker in esg) {
		e[ticker] = esg[ticker];
	}

	fs.writeFileSync("./cache/esg_data.json", JSON.stringify(e, null, 4), {});

	Logging.log("Data written to file");
};


/*
Bug - formation of thisd is not working -- to fix
 */

// ExecFinnhubBatch().then(() => null);
ExecEsgBatch(0, undefined).then(() => null);