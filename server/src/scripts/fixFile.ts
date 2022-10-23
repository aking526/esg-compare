import fs from "fs";
import ISA from "../types/ISA";

const fixESGJSON = () => {
	const esg = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());

	let arr: ISA[] = [];
	for (const ticker in esg) {
		arr.push(esg[ticker]);
	}

	let fixed: ISA = {};
	for (let i = 0; i < arr.length; i++) {
		const curr: ISA = arr[i];
		fixed[curr["stock_symbol"].toLowerCase()] = curr;
	}

	fs.writeFileSync("./cache/esg_data.json", JSON.stringify(fixed, null, 4), {});
};

fixESGJSON();

const sortESGJSON = () => {
	const esg = JSON.parse(fs.readFileSync("./cache/esg_data.json").toString());
};