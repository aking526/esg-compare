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
  const ak = process.env.REACT_APP_AK;
  const res = await axios.get<ISS>(startUrl + `/getNames&token=${ak}`);
  const data = res.data;

  const f: string[][] = [[]];
  f.pop();
  for (const ticker in data) {
    f.push([ticker, data[ticker]]);
  }

  return f;
};

const getIndustries = async () => {
  const ak = process.env.REACT_APP_AK;
  const res = await axios.get<string[]>(startUrl + `/getIndustries&token=${ak}`);
  return res.data;
};

const fetchRankings = async (metric: string, filters: string | null) => {
  const ak = process.env.REACT_APP_AK;
  const url = startUrl + (filters ? `/sort/${metric}&token=${ak}?${filters}` : `/sort/${metric}&token=${ak}`);
  const res = await axios.get<ICompanyData[]>(url);
  return res.data
};

const fetchCompanyData = async (ticker: string | undefined) => {
  const ak = process.env.REACT_APP_AK;
  const res = await axios.get<ICompanyData>(startUrl + `/get/${ticker}&token=${ak}`);
  return res.data;
};

const getScores = async (industry: string | string[] | null | undefined ) => {
  const ak = process.env.REACT_APP_AK;
  const url = startUrl + (industry ? `/getScores&token=${ak}?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getScores&token=${ak}`);
  const res = await axios.get<IScores[]>(url);
  return res.data;
};

const getGrades = async (industry: string | string[] | null | undefined) => {
  const ak = process.env.REACT_APP_AK;
  const url = startUrl + (industry ? `/getGrades&token=${ak}?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getGrades&token=${ak}`);
  const res = await axios.get<IGrades[]>(url);
  return res.data;
};

const getLevels = async (industry: string | string[] | null | undefined ) => {
  const ak = process.env.REACT_APP_AK;
  const url = startUrl + (industry ? `/getLevels&token=${ak}?industry=${typeof industry === "string" ? industry : industry.join(",")}` : `/getLevels&token=${ak}`);
  const res = await axios.get<ILevels[]>(url);
  return res.data;
};

const CompaniesApi = { getNames, getIndustries, fetchCompanyData, fetchRankings, getScores, getGrades, getLevels };
export default CompaniesApi;