import fs from "fs";
import axios from "axios";
import Logging from "../utils/Logging";
import { authCheck } from "../utils/authCheck";
import { config } from "../config/config";
import companyProfiler from "../utils/companyProfiler";

const update = async () => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const info_data = JSON.parse(fs.readFileSync("./cache/company_info.json").toString());
	const esg_data = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());
	const ciks = JSON.parse(fs.readFileSync("./data/ciks.json").toString());

	const nres = await axios.get(`http://localhost:8000/api/companies/getNames`);
	const names = nres.data;

	let toCheck: string[] = [];
	for (const ticker in names) {
		toCheck.push(ticker);
	}

	let toUpdate: string[] = [];
	for (let i = 0; i < toCheck.length; i++) {
		const curr = toCheck[i];
		if (!(curr in esg_data) || !(curr in info_data)) continue;

		toUpdate.push(curr);
	}

	let updated: string[] = [];
	for (let i = 0; i < toUpdate.length; i++) {
		const curr = toUpdate[i];
		await companyProfiler.updateProfile(curr, ciks[curr], () => {
			updated.push(curr);
			if (updated.length == toUpdate.length) {
				return updated;
			}
		}, SERVER_AUTH, esg_data[curr]);
	}

	return updated;
};

update().then((updated) => Logging.log("Updated: " + updated.join(" ")));

