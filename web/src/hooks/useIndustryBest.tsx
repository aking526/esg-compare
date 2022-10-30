import { useEffect, useState } from "react";
import CompaniesApi from "../api/CompaniesApi";
import {
	gradeMetrics,
	IGrades,
	ILevels,
	IScores,
	levelsMetrics,
	NullGrades,
	NullLevels,
	NullScores,
	possibleGrades,
	possibleLevels,
	scoreMetrics
} from "../types/ESGDataInterfaces";

export function useIndustryBest(industry: string | string[] | undefined) {
	const [isLoading, setIsLoading] = useState(false);
	const [bestScores, setBestScores] = useState<IScores>(NullScores);
	const [bestGrades, setBestGrades] = useState<IGrades>(NullGrades);
	const [bestLevels, setBestLevels] = useState<ILevels>(NullLevels);

	const calculateMaxScore = (data: IScores[], metric: string) => {
		data.sort((c1: IScores, c2: IScores) => {
			if (c1[metric] < c2[metric]) return -1;
			else return 1;
		});
		return data[data.length - 1][metric];
	};

	const calculateMaxGrade = (data: IGrades[], metric: string) => {
		data.sort((c1: IGrades, c2: IGrades) => {
			if (possibleGrades.indexOf(c1[metric]) < possibleGrades.indexOf(c2[metric])) return -1;
			else return 1;
		});
		return data[data.length - 1][metric];
	};

	const calculateMaxLevel = (data: ILevels[], metric: string) => {
		data.sort((c1: ILevels, c2: ILevels) => {
			if (possibleLevels.indexOf(c1[metric]) < possibleLevels.indexOf(c2[metric])) return -1;
			else return 1;
		});
		return data[data.length - 1][metric];
	};


	useEffect(() => {
		if (!industry) return;

		const fetchData = async () => {
			setIsLoading(true);
			const scoresData = await CompaniesApi.getScores(industry);
			let nax: IScores = NullScores;
			for (let i = 0; i < scoreMetrics.length; i++) {
				nax[scoreMetrics[i]] = calculateMaxScore(scoresData, scoreMetrics[i]);
			}
			setBestScores(nax);

			const gradesData = await CompaniesApi.getGrades(industry);
			let ng: IGrades = NullGrades;
			for (let i = 0; i < gradeMetrics.length; i++) {
				ng[gradeMetrics[i]] = calculateMaxGrade(gradesData, gradeMetrics[i]);
			}
			setBestGrades(ng);

			const levelsData = await CompaniesApi.getLevels(industry);
			let nl: ILevels = NullLevels;
			for (let i = 0; i < levelsMetrics.length; i++) {
				nl[levelsMetrics[i]] = calculateMaxLevel(levelsData, levelsMetrics[i]);
			}
			setBestLevels(nl);
		};

		fetchData().then(() => setIsLoading(false));
	}, [industry]);

	return { isLoading, bestScores, bestGrades, bestLevels };
}