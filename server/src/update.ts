import axios, { AxiosResponse, AxiosError } from "axios";
import Logging from "./utils/Logging";
import { authCheck } from "./authCheck";

function updateCompany(ticker: string, auth: string, callback: Function) {
	authCheck(auth);

	axios.patch(`http://localhost:8000/companies/update/auth=:${auth}&ticker=:${ticker}`)
		.then((res: AxiosResponse) => {
			Logging.log(res);
			callback();
		})
		.catch((error: AxiosError) => {
			Logging.error(error);
		});
}

