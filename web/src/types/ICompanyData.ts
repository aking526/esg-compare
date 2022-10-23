import ISA from "./ISA";

export interface ICompanyData extends ISA {
	_id?: any;
	ticker: string;
	name: string;
	cik: string;
	currency: string;
	exchange: string;
	industry: string;
	logo: string;
	weburl: string;
	market_cap: number;
	esg_id: number;
	environment_grade: string;
	environment_level: string;
	social_grade: string;
	social_level: string;
	governance_grade: string;
	governance_level: string;
	environment_score: number;
	social_score: number;
	governance_score: number;
	total_grade: string;
	total_level: string;
	total_score: number;
}

export const BlankCompanyData: ICompanyData = {
	_id: null,
	ticker: "",
	name: "",
	cik: "",
	currency: "",
	exchange: "",
	industry: "",
	logo: "",
	weburl: "",
	market_cap: -1,
	esg_id: -1,
	environment_grade: "",
	environment_level: "",
	social_grade: "",
	social_level: "",
	governance_grade: "",
	governance_level: "",
	environment_score: -1,
	social_score: -1,
	governance_score: -1,
	total_grade: "",
	total_level: "",
	total_score: -1
};