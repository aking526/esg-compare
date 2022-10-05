import axios from "axios";
import fs from "fs";
import { config } from "../config/config";
import { authCheck } from "./authCheck";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";

const checkDuplicated = async (ticker: string) => {
	const res = await axios.get(`http://localhost:8000/api/companies/get/${ticker}`);
	const data = res.data;

	return { duplicated: data.length > 1, toRemove: data[0]["_id"] };
};

const removeDuplicates = async () => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const tres = await axios.get(`http://localhost:8000/api/companies/getNames`);

	let ind: string[] = [];
	for (const ticker in tres.data) {
		ind.push(ticker);
	}

	let duplicated: { ticker: string, toRemove: string }[] = [];
	for (let i = 0; i < ind.length; i++) {
		const p = await checkDuplicated(ind[i]);
		if (p.duplicated) {
			duplicated.push({ ticker: ind[i], toRemove: p.toRemove });
		}
	}

	let removed: string[] = [];
	try {
		for (let i = 0; i < duplicated.length; i++) {
			const p = duplicated[i];
			await axios.delete(`http://localhost:8000/api/companies/deleteById/id=${p.toRemove}&auth=${SERVER_AUTH}`);
			removed.push(p.ticker);
		}
	} catch (e) {
		// @ts-ignore
		Logging.error(e.response.data);
	}

	return removed;
};

// removeDuplicates().then((removed) => Logging.log("Removed duplicates of: " + removed.join(" ")));

const fixESGJSON = () => {
	const esg = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());

	let arr: ISA[] = [];
	for (const ticker in esg) {
		arr.push(esg[ticker]);
	}

	let fixed: ISA = {};
	for (let i = 0; i < arr.length; i++) {
		const curr: ISA = arr[i];
		fixed[curr["stock_symbol"].toLowerCase()] = curr;
	}

	fs.writeFileSync("./cache/esg_data.json", JSON.stringify(fixed, null, 4), {});
};

fixESGJSON();