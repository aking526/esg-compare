import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "./config/config";
import company_list from "../mods/company_list.json";
import Logging from "./utils/Logging";

// Type of imported data
interface DataObject {
	[index: string] : any
}

async function Main() {
	const ESG_API_KEY = config.keys.esg;
	const FINNHUB_API_KEY = config.keys.finnhub;

	if (ESG_API_KEY === "" || FINNHUB_API_KEY === "") {
		Logging.error("API KEY missing. Get your own key. Websites: https://www.esgenterprise.com/esg-analytics/esg-api-developer/, https://finnhub.io/");
		process.exit(1);
	}

	const GetCompanyInfo = async (tickers: string[]) => {
		Logging.log("Fetching company info for: " + tickers.join(" "));
		let data: DataObject = {};
		const go = async (ticker: string) => {
			const response: AxiosResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`);
			data[ticker] = response.data;
		};

		for (let i = 0; i < tickers.length; i++) {
			await go(tickers[i]);
		}

		return data;
	}

	const GetESGData = async (tickers: string[]) => {
		Logging.log("Fetching ESG data for: " + tickers.join(" "));
		const response: AxiosResponse = await axios.get("https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=" +
				tickers.join(",") +
				"&token=" + ESG_API_KEY
		);
		const req = await response.data;

		let data: DataObject = {};
		for (let i = 0; i < tickers.length; i++) {
			data[tickers[i]] = req[i];
		}

		return data;
	}

	let company_info_data: DataObject = await GetCompanyInfo(company_list);
	let esg_data: DataObject = await GetESGData(company_list);

	// gets the data for the company in the correct form and makes the post request
	const BuildProfile = (ticker: string, callback: Function) => {
		const curr_ci = company_info_data[ticker];
		const curr_esg = esg_data[ticker];

		const data = {
			ticker: ticker,
			name: curr_ci["name"],
			currency: curr_ci["currency"],
			exchange: curr_ci["exchange"],
			industry: curr_ci["finnhubIndustry"],
			logo: curr_ci["logo"],
			weburl: curr_ci["weburl"],
			esg_id: curr_esg["esg_id"],
			market_cap: curr_ci["marketCapitalization"],
			environment_grade: curr_esg["environment_grade"],
			environment_level: curr_esg["environment_level"],
			social_grade: curr_esg["social_grade"],
			social_level: curr_esg["social_level"],
			governance_grade: curr_esg["governance_grade"],
			governance_level: curr_esg["governance_level"],
			environment_score: curr_esg["environment_score"],
			social_score: curr_esg["social_score"],
			governance_score: curr_esg["governance_score"],
			total_score: curr_esg["total"]
		};

		axios.post("http://localhost:8000/companies/create", data)
			.then((res: AxiosResponse) => {
				Logging.log(res)
				callback();
			})
			.catch((error: AxiosError) => {
				if (error.response) {
					// @ts-ignore
					Logging.error(error.response.data.error.details);
				}
				callback();
			});
	}

	let counter = 0;
	for (let i = 0; i < company_list.length; i++) {
		BuildProfile(company_list[i], () => {
			counter++
			Logging.log(counter + " number of profiles built");
			if (counter === company_list.length) {
				Logging.log("Downloads complete.");
				process.exit(1);
			}
		});
	}
}

// Call to main function --> have to await data
Main().then(() => null);