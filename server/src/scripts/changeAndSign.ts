import axios from "axios";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";

const changeAndSign = async (type: string) => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const res = await axios.get(`http://localhost:80/api/companies/tempFixer&auth=${SERVER_AUTH}`);
	const companies = res.data;

	const changed: ISA[] = [];
	for (let i = 0; i < companies.length; i++) {
		changed[i] = companies[i];
		delete changed[i]["_id"];
		changed[i].industry = changed[i].industry.replace("&", "and");
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

changeAndSign("Commercial Services & Supplies").then(() => Logging.log("Function Complete"));