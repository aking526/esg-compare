import axios, { AxiosError, AxiosResponse } from "axios";
import Logging from "./utils/Logging";
import company_list from "../mods/company_list.json";
import { config } from "./config/config";

function deleteCompany(ticker: string, auth: string, callback: Function) {
	axios.delete(`http://localhost:8000/companies/delete/auth=${auth}&ticker=${ticker}`)
		.then((res: AxiosResponse) => {
			Logging.log(res);
			callback();
		})
		.catch((error: AxiosError) => {
			if (error.response) {
				Logging.error(error.response);
			}
		});
}

function deleteAll() {
	const SERVER_AUTH = config.server.auth;

	if (SERVER_AUTH === "") {
		Logging.error("No user authentication. Do not try to modify the database!");
		process.exit(1);
	}

	let counter = 0;
	for (let i = 0; i < company_list.length; i++) {
		deleteCompany(company_list[i], SERVER_AUTH, () => {
			counter++;
			Logging.log(counter + " number of companies deleted");
			if (counter === company_list.length) {
				Logging.log("Deletions complete.");
				process.exit(1);
			}
		});
	}
}

deleteAll();
