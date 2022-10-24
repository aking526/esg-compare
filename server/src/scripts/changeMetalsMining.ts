import axios from "axios";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";

const changeMetalsMining = async () => {
	const SERVER_AUTH = config.server.auth;

	authCheck(SERVER_AUTH);

	const res = await axios.get("http://localhost:8000/api/companies/tempFixer");
	const mm: ISA[] = res.data;

	let changed: ISA[] = [];
	for (let i = 0; i < mm.length; i++) {
		changed[i] = mm[i];
		delete changed[i]["_id"];
		changed[i].industry = "Metals and Mining";
	}

	let cnt = 0;
	for (let i = 0; i < changed.length; i++) {
		axios.patch(`http://localhost:8000/api/companies/update/ticker=${changed[i]["ticker"].toLowerCase()}&auth=${SERVER_AUTH}`, changed[i]).then(() => {
			cnt++;
			if (cnt === changed.length) {
				Logging.log(`Updated ${cnt} metal and mining companies`);
				process.exit(0);
			}
		}).catch((error) => Logging.error(error.response.data.error));
	}
};

changeMetalsMining().then(() => Logging.log("Metals & Mining Function Complete"));

export default changeMetalsMining;