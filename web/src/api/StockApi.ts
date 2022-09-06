import axios from "axios";
import ISA from "../types/ISA";

const apiClient = axios.create({
	baseURL: "http://localhost:8000/stockInfo",
	headers: {
		"Content-type": "application/json"
	}
});

const fetchStockInfo = async (ticker: string | undefined, resolution: string, from: string | number, to: string | number) => {
	const res = await apiClient.get<ISA>(`/get/symbol=:${ticker}&resolution=:${resolution}&from=:${from}&to=:${to}`);
	return res.data;
};

const StockApi = { fetchStockInfo };
export default StockApi;