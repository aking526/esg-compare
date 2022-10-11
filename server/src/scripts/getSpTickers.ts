import fs from "fs";

const sp500_json = fs.readFileSync("./data/sp500.csv").toString().split("\n");

let tickers: string[] = [];
for (let i = 0; i < sp500_json.length; i++) {
	const curr = sp500_json[i].split(",")[0].toLowerCase();
	if (curr == "symbol" || curr == "") continue;
	tickers.push(curr);
}

fs.writeFileSync("./data/sp500_tickers.json", JSON.stringify(tickers, null , 4), {});