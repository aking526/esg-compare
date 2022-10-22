import axios from "axios";
import ISS from "../types/ISS";
import { ICompanyData } from "../types/ICompanyData";
import { IScores, IGrades, ILevels } from "../types/ESGDataInterfaces";

// const apiClient = axios.create({
//   baseURL: "/api/companies",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

// Production
// const startUrl = "/api/companies";

// Development
const startUrl = "http://localhost:8000/api/companies";

const getNames = async () => {
  const res = await axios.get<ISS>(startUrl + "/getNames");
  const data = res.data;

  const f: string[][] = [[]];
  f.pop();
  for (const ticker in data) {
    f.push([ticker, data[ticker]]);
  }

  return f;
};

const getIndustries = async () => {
  const res = await axios.get<string[]>(startUrl + "/getIndustries");
  return res.data;
};

const fetchRankings = async (metric: string, filters: string | null) => {
  const url = startUrl + (filters ? `/sort/${metric}?${filters}` : `/sort/${metric}`);
  const res = await axios.get<ICompanyData[]>(url);
  return res.data
};

const fetchCompanyData = async (ticker: string | undefined) => {
  const res = await axios.get<ICompanyData>(startUrl + `/get/${ticker}`);
  return res.data;
};

const getScores = async (industry: string | string[] | null | undefined ) => {
  const url = startUrl + (industry ? `/getScores?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getScores`);
  const res = await axios.get<IScores[]>(url);
  return res.data;
};

const getGrades = async (industry: string | string[] | null | undefined) => {
  const url = startUrl + (industry ? `/getGrades?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getGrades`);
  const res = await axios.get<IGrades[]>(url);
  return res.data;
};

const getLevels = async (industry: string | string[] | null | undefined ) => {
  const url = startUrl + (industry ? `/getLevels?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getLevels`);
  const res = await axios.get<ILevels[]>(url);
  return res.data;
};

const CompaniesApi = { getNames, getIndustries, fetchCompanyData, fetchRankings, getScores, getGrades, getLevels };
export default CompaniesApi;