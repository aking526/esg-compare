import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ISA from "../types/ISA";
import { convertStockData, CPair } from "../classes/CPair";
import StockApi from "../api/StockApi";
import { convertDateToUnix } from "../utils/date";

export function useStockData(ticker: string, spcLen: string, f?: number, t?: number) {
	const [stockPrices, setStockPrices] = useState<CPair[]>([]);
	const [to, setTo] = useState<number>(t ? t : convertDateToUnix(new Date()));
	const [cachedData, setCachedData] = useState<ISA | undefined>(undefined);

	const queryClient = useQueryClient();

	useEffect(() => {
		const cd: ISA | undefined = queryClient.getQueryData([`${ticker}_stock_prices`]);
		setCachedData(cd);
	}, [spcLen]);

	const sp = useQuery([`${ticker}_stock_prices`], async () => {
		if (ticker === "" || ticker === undefined || !ticker) return { message: "No Ticker" };

		let from = new Date();
		from.setFullYear(from.getFullYear() - 5);

		return await StockApi.fetchStockInfo(ticker, "D", convertDateToUnix(from), to);
	}, {
		onSuccess: (res) => {
			if (!res || "message" in res) return;
			setStockPrices(convertStockData(res, "c"));
		}
	});

	if (!ticker) {
		queryClient.removeQueries([`${ticker}_stock_prices`]);
	}

	if (cachedData) return { prices: convertStockData(cachedData, "c"), isLoading: false, isError: false, error: null };
	return { prices: stockPrices, isLoading: sp.isLoading, isError: sp.isError, error: sp.error };
}