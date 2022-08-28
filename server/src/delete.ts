import axios, { AxiosError, AxiosResponse } from "axios";
import Logging from "./utils/Logging";
import company_list from "../mods/company_list.json";

function deleteCompany(ticker: string, callback: Function) {
	axios.delete(`http://localhost:8000/companies/delete/${ticker}`)
		.then((res: AxiosResponse) => {
			Logging.log(res);
			callback();
		})
		.catch((error: AxiosError) => {
			if (error.response) {
				Logging.error(error.response);
			}
			callback();
		});
}

function deleteAll() {
	let counter = 0;
	for (let i = 0; i < company_list.length; i++) {
		deleteCompany(company_list[i], () => {
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
