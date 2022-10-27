import { useState, useEffect } from "react";
import CompaniesApi from "../api/CompaniesApi";
import {
	IGrades,
	IScores,
	possibleGrades,
	ILevels,
	possibleLevels,
	NullScores,
	NullGrades,
	NullLevels
} from "../types/ESGDataInterfaces";

export function useIndustryAvg(industry: string | string[] | undefined) {
	const [isLoading, setIsLoading] = useState(false);
	const [avgScores, setAvgScores] = useState<IScores>(NullScores);
	const [avgGrades, setAvgGrades] = useState<IGrades>(NullGrades);
	const [avgLevels, setAvgLevels] = useState<ILevels>(NullLevels);

	const scoreMetrics = ["environment_score", "social_score", "governance_score", "total_score"];
	const gradeMetrics = ["environment_grade", "social_grade", "governance_grade", "total_grade"];
	const levelsMetrics = ["environment_level", "social_level", "governance_level", "total_level"];

	const calculateAvgScore = (data: IScores[], metric: string) => {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data[i][metric];
		}
		return Math.round(total / data.length);
	};

	const calculateAvgGrade = (data: IGrades[], metric: string) => {
		let idxTotal = 0;
		for (let i = 0; i < data.length; i++) {
			idxTotal += possibleGrades.indexOf(data[i][metric]);
		}

		const avgIdx = Math.round(idxTotal / data.length);
		return possibleGrades[avgIdx];
	};

	const calculateAvgLevel = (data: ILevels[], metric: string) => {
		let idxTotal = 0;
		for (let i = 0; i < data.length; i++) {
			idxTotal += possibleLevels.indexOf(data[i][metric]);
		}

		const avgIdx = Math.round(idxTotal / data.length);
		return possibleLevels[avgIdx];
	};

	useEffect(() => {
		if (!industry) return;

		const fetchData = async () => {
			setIsLoading(true);
			const scoresData = await CompaniesApi.getScores(industry);
			let avgs: any = {};
			for (let i = 0; i < scoreMetrics.length; i++) {
				avgs[scoreMetrics[i]] = calculateAvgScore(scoresData, scoreMetrics[i]);
			}
			setAvgScores(avgs);

			const gradesData = await CompaniesApi.getGrades(industry);
			avgs = {};
			for (let i = 0; i < gradeMetrics.length; i++) {
				avgs[gradeMetrics[i]] = calculateAvgGrade(gradesData, gradeMetrics[i]);
			}
			setAvgGrades(avgs);

			const levelsData = await CompaniesApi.getLevels(industry);
			avgs = {};
			for (let i = 0; i < levelsMetrics.length; i++) {
				avgs[levelsMetrics[i]] = calculateAvgLevel(levelsData, levelsMetrics[i]);
			}
			setAvgLevels(avgs);
		}

		fetchData().then(() => setIsLoading(false));
	}, [industry]);


	return { avgScores, avgGrades, avgLevels, isLoading };
}