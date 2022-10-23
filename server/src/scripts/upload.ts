import fs from "fs";
import company_tickers from "../../data/company_tickers.json";
import axios from "axios";
import Logging from "../utils/Logging";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";
import companyProfiler from "../utils/companyProfiler";

export const inDB = (ticker: string, cInDB: any) => {
	return ticker in cInDB;
};

const Main = async () => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const info_data = JSON.parse(fs.readFileSync("./cache/company_info.json").toString());
	const esg_data = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());
	const ciks = JSON.parse(fs.readFileSync("./data/ciks.json").toString());

	const cInDB = await axios.get("http://localhost:8000/api/companies/getNames");

	let toUpload: string[] = [];
	for (let i = 0; i < company_tickers.length; i++) {
		const curr = company_tickers[i];
		if (!(curr in esg_data) || !(curr in info_data)) continue; // check if data is downloaded
		if (inDB(curr, cInDB)) continue; // check if company is already in database

		toUpload.push(curr);
	}

	let uploaded: string[] = [];
	for (let i = 0; i < toUpload.length; i++) {
		companyProfiler.buildProfile(toUpload[i], ciks[toUpload[i]], info_data[toUpload[i]], esg_data[toUpload[i]], () => {
			uploaded.push(toUpload[i]);
			if (uploaded.length === toUpload.length) {
				return uploaded;
			}
		}, SERVER_AUTH);
	}

	return uploaded;
};

Main().then((list ) => Logging.log("Uploaded: " + list.join(" ")));