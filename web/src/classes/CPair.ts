export class CPair {
	date: string;
	price: number;
	constructor(d: string, p: number) {
		this.date = d;
		this.price = p;
	}
}

export function getMaxPrice(prices: CPair[]) {
	let nax: CPair = new CPair("", -1);
	for (let i = 0; i < prices.length; i++) {
		if (prices[i].price >= nax.price) {
			nax = prices[i];
		}
	}
	return nax;
}

export function getMinPrice(prices: CPair[]) {
	let nin: CPair = new CPair("", Number.MAX_VALUE);
	for (let i = 0; i < prices.length; i++) {
		if (prices[i].price <= nin.price) {
			nin = prices[i];
		}
	}
	return nin;
}

export function getAvgPriceOverPeriod(start: string, end: string, prices: CPair[]) {

}