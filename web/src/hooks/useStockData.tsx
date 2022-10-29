import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { convSPCFrom } from "./useSPCFrom";
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
		const cd: ISA | undefined = queryClient.getQueryData([`${ticker}_stock_prices`, spcLen]);
		setCachedData(cd);
	}, [spcLen]);

	const sp = useQuery([`${ticker}_stock_prices`, spcLen], async () => {
		if (ticker === "" || ticker === undefined || !ticker) return { message: "No Ticker" };

		const from = convSPCFrom(spcLen);

		return await StockApi.fetchStockInfo(ticker, "D", from, to);
	}, {
		onSuccess: (res) => {
			if (!res || "message" in res) return;
			setStockPrices(convertStockData(res, "c"));
		}
	});

	if (!ticker) {
		queryClient.removeQueries([`${ticker}_stock_prices`, spcLen]);
	}

	if (cachedData) return { prices: convertStockData(cachedData, "c"), isLoading: false, isError: false, error: null };
	return { prices: stockPrices, isLoading: sp.isLoading, isError: sp.isError, error: sp.error };
}