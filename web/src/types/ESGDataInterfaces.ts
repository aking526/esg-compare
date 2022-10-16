import ISA from "./ISA";

export interface IScores extends ISA {
	environment_score : number;
	social_score: number;
	governance_score: number;
	total_score: number;
}

export interface IGrades extends ISA {
	environment_grade: string;
	social_grade: string;
	governance_grade: string;
	total_grade: string;
}

export const possibleGrades = ["D", "DD", "DDD", "C", "CC", "CCC", "B", "BB", "BBB", "A", "AA", "AAA"];

export interface ILevels extends ISA {
	environment_level: string;
	social_level: string;
	governance_level: string;
	total_level: string;
}


export const possibleLevels = ["Low", "Medium", "High", "Excellent"];