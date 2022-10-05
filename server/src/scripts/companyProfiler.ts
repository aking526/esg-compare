import axios, { AxiosError, AxiosResponse } from "axios";
import { ICompany } from "../models/Company.model";
import Logging from "../utils/Logging";
import ISA from "../types/ISA";

const formSchema = (ticker: string, curr_ci: ISA, curr_esg: ISA) => {
	const data: ICompany = {
		ticker: ticker,
		name: curr_ci["name"],
		currency: curr_ci["currency"],
		exchange: curr_ci["exchange"],
		industry: curr_ci["finnhubIndustry"],
		logo: curr_ci["logo"],
		weburl: curr_ci["weburl"],
		esg_id: curr_esg["esg_id"],
		environment_grade: curr_esg["environment_grade"],
		environment_level: curr_esg["environment_level"],
		social_grade: curr_esg["social_grade"],
		social_level: curr_esg["social_level"],
		governance_grade: curr_esg["governance_grade"],
		governance_level: curr_esg["governance_level"],
		environment_score: curr_esg["environment_score"],
		social_score: curr_esg["social_score"],
		governance_score: curr_esg["governance_score"],
		total_score: curr_esg["total"],
		last_processing_date: curr_esg["last_processing_date"]
	};

	return data;
};

const buildProfile = (ticker: string, curr_ci: ISA, curr_esg: ISA, callback: Function, SERVER_AUTH: string) => {
	const data = formSchema(ticker, curr_ci, curr_esg);

	axios.post(`http://localhost:8000/api/companies/create/auth=${SERVER_AUTH}`, data)
			.then((res: AxiosResponse) => {
				// Logging.log(res.data);
				callback();
			})
			.catch((error: AxiosError) => {
				Logging.log(`Error with: ${ticker}`);
				if (error.response) {
					Logging.error(error.response);
				}
			});
};

const updateProfile = (ticker: string, curr_ci: ISA, curr_esg: ISA, callback: Function, SERVER_AUTH: string) => {
	const data = formSchema(ticker, curr_ci, curr_esg);

	axios.patch(`http://localhost:8000/api/companies/update/ticker=${ticker}&auth=${SERVER_AUTH}`, data)
			.then((res: AxiosResponse) => {
				// Logging.log(res.data);
				callback();
			})
			.catch((error: AxiosError) => {
				Logging.log(`Error with: ${ticker}`);
				if (error.response) {
					// @ts-ignore
					Logging.error(error.response.data.message);
				}
			});
};

const companyProfiler = { buildProfile, updateProfile };
export default companyProfiler;