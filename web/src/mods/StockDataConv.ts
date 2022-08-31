import ISA from "../types/ISA";

export const StockDataOptions = ["open", "high", "low", "close", "volume"];

export const GeneralStockConv = {
	"md": "Meta Data",
	"daily": "Time Series (Daily)"
};

export const MDConv = {
	"info": "1. Information",
	"ticker": "2. Symbol",
	"lastRefreshed": "3. Last Refreshed",
	"outputSize": "4. Output Size",
	"timeZone": "5. Time Zone"
}

export const StockDataConv: ISA = {
	"open": "1. open",
	"high": "2. high",
	"low": "3. low",
	"close": "4. close",
	"volume": "5. volume"
};