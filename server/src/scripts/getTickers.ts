import fs from "fs";

const nasdaq = fs.readFileSync("./data/nasdaq_screener_nasdaq.csv").toString().split("\n");
const nyse = fs.readFileSync("./data/nasdaq_screener_nyse.csv").toString().split("\n");

let tickers: string[] = [];

const add = (exchange: string[]) => {
	for (let i = 0; i < exchange.length; i++) {
		const curr = exchange[i].split(",")[0].toLowerCase();
		if (curr === "symbol" || curr === "") continue;
		tickers.push(curr);
	}
};

add(nasdaq);
add(nyse);

fs.writeFileSync("./data/company_tickers.json", JSON.stringify(tickers, null, 4), {});