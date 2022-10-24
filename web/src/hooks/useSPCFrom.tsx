import { useState, useEffect } from "react";
import { convertDateToUnix } from "../utils/date";

export function useSPCFrom(spcLen: string) {
	const [from, setFrom] = useState<number | undefined>(undefined);

	useEffect(() => {
		let d = new Date();
		if (spcLen === "1 week") {
			d.setDate(d.getDate() - 7);
		} else if (spcLen === "1 month") {
			d.setMonth(d.getMonth() - 1);
		} else if (spcLen === "6 months") {
			d.setMonth(d.getMonth() - 6);
		} else if (spcLen === "1 year") {
			d.setFullYear(d.getFullYear() - 1);
		}

		setFrom(convertDateToUnix(d));
	}, [spcLen]);

	return from;
}