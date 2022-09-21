import axios from "axios";
import ISA from "../types/ISA";

const apiClient = axios.create({
	baseURL: "/api/stockInfo",
	headers: {
		"Content-type": "application/json"
	}
});

const fetchStockInfo = async (ticker: string | undefined, resolution: string, from: string | number, to: string | number) => {
	const res = await apiClient.get<ISA>(`/get/symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}`);
	return res.data;
};

const getNews = async (ticker: string | undefined, from: string, to: string) => {
	const res = await apiClient.get(`/getNews/${ticker}/from=${from}&to=${to}`);
	return res.data;
};

const StockApi = { fetchStockInfo, getNews };
export default StockApi;