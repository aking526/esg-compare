import { useState, useEffect } from "react";
import { convertDateToUnix } from "../utils/date";

export function useSPCFrom(spcLen: string) {
	const [from, setFrom] = useState<number>(-1);

	useEffect(() => {
		let d = new Date();
		if (spcLen === "5 days") {
			d.setDate(d.getDate() - 5);
		} else if (spcLen === "1 month") {
			d.setMonth(d.getMonth() - 1);
		} else if (spcLen === "6 months") {
			d.setMonth(d.getMonth() - 6);
		} else if (spcLen === "1 year") {
			d.setFullYear(d.getFullYear() - 1);
		} else if (spcLen === "5 years") {
			d.setFullYear(d.getFullYear() - 5);
		}
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);

		setFrom(convertDateToUnix(d));
	}, [spcLen]);

	return from;
}

export function convSPCFrom(spcLen: string) {
	let d = new Date();
	if (spcLen === "5 days") {
		d.setDate(d.getDate() - 5);
	} else if (spcLen === "1 month") {
		d.setMonth(d.getMonth() - 1);
	} else if (spcLen === "6 months") {
		d.setMonth(d.getMonth() - 6);
	} else if (spcLen === "1 year") {
		d.setFullYear(d.getFullYear() - 1);
	} else if (spcLen === "5 years") {
		d.setFullYear(d.getFullYear() - 5);
	}
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	return convertDateToUnix(d);
}