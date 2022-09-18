import fs from "fs";
import Company, { ICompany } from "../models/Company.model";
import company_tickers from "../../data/company_tickers.json";
import axios, { AxiosError, AxiosResponse } from "axios";
import Logging from "../utils/Logging";
import { config } from "../config/config";
import { authCheck } from "./authCheck";

async function Main() {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	// const info_data = JSON.parse(fs.readFileSync("./cache/company_info.json").toString());
	// const esg_data = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());
	const info_data: { [index: string] : any } = {};
	const esg_data: { [index: string] : any } = {};

	const buildProfile = async (ticker: string, callback: Function) => {
		const curr_ci = info_data[ticker];
		const curr_esg = esg_data[ticker];

		const data: ICompany = {
			ticker: ticker,
			name: curr_ci["name"],
			currency: curr_ci["currency"],
			exchange: curr_ci["exchange"],
			industry: curr_ci["finnhubIndustry"],
			logo: curr_ci["logo"],
			weburl: curr_ci["weburl"],
			market_cap: curr_ci["marketCapitalization"],
			esg_id: curr_esg["esg_id"],
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

		await axios.post(`http://localhost:8000/companies/create/auth=${SERVER_AUTH}`, data)
			.then((res: AxiosResponse) => {
				Logging.log(res.data);
				callback();
			})
			.catch((error: AxiosError) => {
				if (error.response) {
					Logging.error(error.response);
				}
			});
	}

	const inDB = async (ticker: string) => {
		return Company.exists({ ticker: ticker }).then(has => { return has });
	};

	Logging.log(await inDB("aapl"));

	let uploaded: string[] = [];
	for (let i = 0; i < company_tickers.length; i++) {
		const curr = company_tickers[i];
		if (!(curr in esg_data) || !(curr in info_data)) continue;

		Logging.log(`To upload ${curr}`);
		uploaded.push(curr);
	}

	return uploaded;
}

Main().then((list) => Logging.log("Uploaded: " + list.join(" ")));