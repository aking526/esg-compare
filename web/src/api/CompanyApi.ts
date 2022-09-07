import axios from "axios";
import ISS from "../types/ISS";
import { ICompanyData } from "../types/ICompanyData";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/companies",
  headers: {
    "Content-type": "application/json"
  }
});

const getNames = async () => {
  const res = await apiClient.get<ISS>("/getNames");
  const data = res.data;

  const f: string[][] = [[]];
  f.pop();
  for (const ticker in data) {
    f.push([ticker, data[ticker]]);
  }

  return f;
};

const fetchRankings = async (metric: string) => {
  const res = await apiClient.get<ICompanyData[]>(`sort/${metric}`);
  return res.data
};

const fetchCompanyData = async (ticker: string | undefined) => {
  const res = await apiClient.get<ICompanyData>(`/get/${ticker}`);
  return res.data;
};

const CompanyApi = { getNames, fetchCompanyData, fetchRankings };
export default CompanyApi;
