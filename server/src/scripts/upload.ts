import fs from "fs";
import company_tickers from "../../data/company_tickers.json";
import axios from "axios";
import Logging from "../utils/Logging";
import { config } from "../config/config";
import { authCheck } from "./authCheck";
import buildProfile from "./buildProfile";

export const inDB = async (ticker: string) => {
	try {
		const res = await axios.get(`http://localhost:8000/api/companies/getNames`);
		return ticker in res.data;
	}	catch (e) {
		return false;
	}
};

const Main = async () => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const info_data = JSON.parse(fs.readFileSync("./cache/company_info.json").toString());
	const esg_data = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());

	let toUpload: string[] = [];
	for (let i = 0; i < company_tickers.length; i++) {
		const curr = company_tickers[i];
		if (!(curr in esg_data) || !(curr in info_data)) continue; // check if data is downloaded
		if (await inDB(curr)) continue; // check if company is already in database

		toUpload.push(curr);
	}

	let uploaded: string[] = [];
	for (let i = 0; i < toUpload.length; i++) {
		buildProfile(toUpload[i], info_data[toUpload[i]], esg_data[toUpload[i]], () => {
			uploaded.push(toUpload[i]);
			if (uploaded.length === toUpload.length) {
				return uploaded;
			}
		}, SERVER_AUTH);
	}

	return uploaded;
};

Main().then((list ) => Logging.log("Uploaded: " + list.join(" ")));