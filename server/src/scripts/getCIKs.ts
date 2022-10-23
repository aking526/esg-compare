import fs from "fs";
import ISA from "../types/ISA";

const tickers = JSON.parse(fs.readFileSync("./data/company_tickers.json").toString());
const cik_file = fs.readFileSync("./data/tickerToCik.txt").toString().split("\n");

let converted_cik: ISA = {};
for (let i = 0; i < cik_file.length; i++) {
	const str = cik_file[i].split("\t");
	converted_cik[str[0]] = str[1];
}

let write: ISA = {};
for (let i = 0; i < tickers.length; i++) {
	write[tickers[i]] = converted_cik[tickers[i]];
}

fs.writeFileSync("./data/ciks.json", JSON.stringify(write, null, 4), {});