import { useState, useEffect } from "react";
import CompaniesApi from "../api/CompaniesApi";
import { IScores, IScoresTickers } from "../types/IScores";

export function useIndustryAvg(industry: string | string[] | undefined) {
	const [data, setData] = useState<IScoresTickers[] | undefined>(undefined);
	const [avg, setAvg] = useState<IScores | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			const res = await CompaniesApi.getScores(industry);
			setData(res);
		}

		fetchData();
	}, []);

	const calculateAvg = (metric: string) => {
		if (!data) return;

		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i][metric];
		}
		return Math.round(total / data.length);
	};

	const metrics = ["environment_score", "social_score", "governance_score", "total_score"];
	useEffect(() => {
		if (data) {
			let avgs: any = {};
			for (let i = 0; i < metrics.length; i++) {
				avgs[metrics[i]] = calculateAvg(metrics[i]);
			}
			setAvg(avgs);
		}
	}, [data]);

	return avg;
}