import axios from "axios";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";
import { keyCheck } from "../utils/keyCheck";

const changeEnergy = async () => {
	const SERVER_AUTH = config.server.auth;
	const SERVER_KEY = config.server.key;

	keyCheck(SERVER_KEY);
	authCheck(SERVER_AUTH);

	const res = await axios.get(`http://localhost:80/api/companies/sort/total_score&token=${SERVER_KEY}?industry=Energy%20`);
	const energyCompanies: ISA[] = res.data;

	const changed: ISA[] = [];
	for (let i = 0; i < energyCompanies.length; i++) {
		changed[i] = energyCompanies[i];
		delete changed[i]["_id"];
		changed[i].industry = energyCompanies[i].industry.trim();
	}

	let cnt = 0;
	for (let i = 0; i < changed.length; i++) {
		axios.patch(`http://localhost:80/api/companies/update/ticker=${changed[i].ticker.toLowerCase()}&auth=${SERVER_AUTH}`, changed[i]).then(() => {
			cnt++;
			if (cnt === changed.length) {
				Logging.log(`Updated ${cnt} energy companies`);
				process.exit(0);
			}
		}).catch((error) => Logging.error(error.response.data.error));
	}
};

changeEnergy().then(() => Logging.log("Function complete"));

export default changeEnergy;