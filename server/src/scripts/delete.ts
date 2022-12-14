import axios, { AxiosError, AxiosResponse } from "axios";
import Logging from "../utils/Logging";
import company_list from "../../data/company_list.json";
import { config } from "../config/config";
import { authCheck } from "../utils/authCheck";

function deleteCompany(ticker: string, auth: string, callback: Function) {
	authCheck(auth);

	axios.delete(`http://localhost:80/api/companies/delete/ticker=${ticker}&auth=${auth}`)
		.then((res: AxiosResponse) => {
			Logging.log(res);
			callback();
		})
		.catch((error: AxiosError) => {
			if (error.response) {
				Logging.error(error.response);
			}
			// Logging.error(error);
		});
}

function deleteAll() {
	const SERVER_AUTH = config.server.auth;

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

deleteCompany("twtr", config.server.auth, () => Logging.log("Deleted twtr"));
