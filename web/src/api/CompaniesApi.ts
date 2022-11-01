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
const startUrl = "/api/companies";

// Development
// const startUrl = "http://localhost:80/api/companies";

const getNames = async () => {
  const ak = process.env.REACT_APP_AK;
  const res = await axios.get<ISS>(startUrl + `/getNames&token=${ak}`);
  const data = res.data;

  const f: string[][] = [[]];
  f.pop();
  for (const ticker in data) {
    f.push([ticker, data[ticker]]);
  }
  f.sort((s1: string[], s2: string[]) => {
    const a = s1[1], b = s2[1];

    const isLetter = (c: string) => {
      return (65 <= c.charCodeAt(0) && c.charCodeAt(0) <= 90) || (97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122);
    };

    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (!isLetter(a[i]) && isLetter(b[i])) return 1;
      if (!isLetter(b[i]) && isLetter(a[i])) return -1;

      if (a[i].toLowerCase() < b[i].toLowerCase()) return -1;
      else if (a[i].toLowerCase() > b[i].toLowerCase()) return 1;
    }

    return 1;
  });

  return f;
};

const getIndustries = async () => {
  const ak = process.env.REACT_APP_AK;
  const res = await axios.get<string[]>(startUrl + `/getIndustries&token=${ak}`);
  return res.data;
};

const fetchRankings = async (metric: string, filters?: string | null) => {
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