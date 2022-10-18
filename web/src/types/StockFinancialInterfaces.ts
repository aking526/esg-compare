import ISA from "./ISA";

export interface IStockQuote {
	c: number;
	d: number;
	dp: number;
	h: number;
	l: number;
	o: number;
	pc: number;
	t: number
}

export interface IBasicFinancials {
	metric: { [index: string] : string | number };
	metricType: string;
	series: ISA;
}

export interface TNewsInfo {
	category: string;
	datetime: number;
	headline: string;
	id: number;
	image: string;
	related: string;
	source: string;
	summary: string;
	url: string;
}