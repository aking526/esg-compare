import axios from "axios";
import ISS from "../types/ISS";

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

const CompanyApi = { getNames };
export default CompanyApi;
