import axios from "axios";
import ISA from "../types/ISA";
import { IBasicFinancials, IStockQuote } from "../types/StockFinancialInterfaces";

// const apiClient = axios.create({
// 	baseURL: "/api/stockInfo",
// 	headers: {
// 		"Content-type": "application/json"
// 	}
// });

// Production
// const startUrl = "/api/stockInfo";

// Development
const startUrl = "http://localhost:80/api/stockInfo";

const fetchStockInfo = async (ticker: string | undefined, resolution: string, from: string | number, to: string | number) => {
	const ak = process.env.REACT_APP_AK;
	const res = await axios.get<ISA>(startUrl + `/get/symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}&token=${ak}`);
	return res.data;
};

const getQuote = async (ticker: string) => {
	const ak = process.env.REACT_APP_AK;
	const res = await axios.get<IStockQuote>(startUrl + `/getQuote/${ticker}&token=${ak}`);
	return res.data;
};

const getBasicFinancials = async (ticker: string) => {
	const ak = process.env.REACT_APP_AK;
	const res = await axios.get<IBasicFinancials>(startUrl + `/getBasicFinancials/${ticker}&token=${ak}`);
	return res.data;
};

const getNews = async (ticker: string | undefined, from: string, to: string) => {
	const ak = process.env.REACT_APP_AK;
	const res = await axios.get(startUrl + `/getNews/${ticker}/from=${from}&to=${to}&token=${ak}`);
	return res.data;
};

const StockApi = { fetchStockInfo, getQuote, getBasicFinancials, getNews };
export default StockApi;