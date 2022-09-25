import axios, { AxiosResponse } from "axios";
import { config } from "../config/config";
import company_list from "../../data/company_list.json";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";
import { authCheck } from "./authCheck";
import buildProfile from "./buildProfile";

async function Main() {
	const ESG_API_KEY = config.keys.esg;
	const FINNHUB_API_KEY = config.keys.finnhub;
	const SERVER_AUTH = config.server.auth;

	if (ESG_API_KEY === "" || FINNHUB_API_KEY === "") {
		Logging.error("API KEY missing. Get your own key. Websites: https://www.esgenterprise.com/esg-analytics/esg-api-developer/, https://finnhub.io/");
		process.exit(1);
	}

	authCheck(SERVER_AUTH);

	const getCompanyInfo = async (tickers: string[]) => {
		Logging.log("Fetching company info for: " + tickers.join(" "));
		let data: ISA = {};
		const go = async (ticker: string) => {
			const response: AxiosResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`);
			data[ticker] = response.data;
		};

		for (let i = 0; i < tickers.length; i++) {
			await go(tickers[i]);
		}

		return data;
	};

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

		return data;
	};

	let company_info_data: ISA = await getCompanyInfo(company_list);
	let esg_data: ISA = await getESGData(company_list);

	let counter = 0;
	for (let i = 0; i < company_list.length; i++) {
		await buildProfile(company_list[i], company_info_data[company_list[i]], esg_data[company_list[i]], () => {
			counter++
			Logging.log(counter + " number of profiles built");
			if (counter === company_list.length) {
				Logging.log("Downloads complete.");
				process.exit(1);
			}
		}, SERVER_AUTH);
	}
}

// Call to main function --> have to await data
Main().then(() => null);