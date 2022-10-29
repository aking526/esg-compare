import axios from "axios";
import Logging from "../utils/Logging";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";
import ISA from "../types/ISA";

const changeComma = async (type: string) => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const res = await axios.get(`http://localhost:80/api/companies/tempFixer&auth=${SERVER_AUTH}`);
	const companies: ISA[] = res.data;

	const changed: ISA[] = [];
	for (let i = 0; i < companies.length; i++) {
		changed[i] = companies[i];
		delete changed[i]["_id"];
		changed[i].industry = changed[i].industry.replaceAll(",", "");
	}

	let cnt = 0;
	for (let i = 0; i < changed.length; i++) {
		axios.patch(`http://localhost:80/api/companies/update/ticker=${changed[i].ticker.toLowerCase()}&auth=${SERVER_AUTH}`, changed[i]).then(() => {
			cnt++;
			if (cnt === changed.length) {
				Logging.log(`Updated ${cnt} ${type} companies`);
				process.exit(0);
			}
		}).catch((error) => Logging.error(error.response.data.error));
	}
};

changeComma("Textiles, Apparel and Luxury Goods").then(() => Logging.log("Function Complete"));