// Dates ==> Unix Timestamp
import {convertUnixToDate} from "../utils/dateUnixConverter";

export class CPair {
	date: number;
	price: number;
	constructor(date: number, price: number) {
		this.date = date;
		this.price = price;
	}
}

export function getPrices(arr: CPair[]) {
	let go: number[] = [];
	for (let i = 0; i < arr.length; i++) go[i] = arr[i].price;
	return go;
}

export function getDatesFormatted(arr: CPair[]) {
	let go: string[] = [];
	for (let i = 0; i < arr.length; i++) go[i] = convertUnixToDate(arr[i].date);
	return go;
}

export function getMaxPrice(arr: CPair[]) {
	let nax: CPair = new CPair(-1, -1);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].price >= nax.price) {
			nax = arr[i];
		}
	}
	return nax;
}

export function getMinPrice(arr: CPair[]) {
	let nin: CPair = new CPair(-1, Number.MAX_VALUE);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].price <= nin.price) {
			nin = arr[i];
		}
	}
	return nin;
}

export function getAvgPriceOverPeriod(from: string | number, to: string | number, arr: CPair[]) {

}