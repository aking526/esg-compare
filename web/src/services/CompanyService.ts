import axios from "axios";
import { ICompanyData } from "../types/ICompanyData";

const apiClient = axios.create({
	baseURL: "http://localhost:8000/companies",
	headers: {
		"Content-type": "application/json"
	}
});

const CompanyService = {};
export default CompanyService;