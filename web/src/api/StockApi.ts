import axios from "axios";
import ISA from "../types/ISA";
import { IBasicFinancials, IStockQuote } from "../types/StockFinancialInterfaces";

const apiClient = axios.create({
	baseURL: "localhost:8000/api/stockInfo",
	headers: {
		"Content-type": "application/json"
	}
});

const fetchStockInfo = async (ticker: string | undefined, resolution: string, from: string | number, to: string | number) => {
	const res = await apiClient.get<ISA>(`/get/symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}`);
	return res.data;
};

const getQuote = async (ticker: string) => {
	const res = await apiClient.get<IStockQuote>(`/getQuote/${ticker}`);
	return res.data;
};

const getBasicFinancials = async (ticker: string) => {
	const res = await apiClient.get<IBasicFinancials>(`/getBasicFinancials/${ticker}`);
	return res.data;
};

const getNews = async (ticker: string | undefined, from: string, to: string) => {
	const res = await apiClient.get(`/getNews/${ticker}/from=${from}&to=${to}`);
	return res.data;
};

const StockApi = { fetchStockInfo, getQuote, getBasicFinancials, getNews };
export default StockApi;