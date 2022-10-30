import ISA from "./ISA";

export interface IScores extends ISA {
	environment_score : number;
	social_score: number;
	governance_score: number;
	total_score: number;
}

export const NullScores: IScores = {
	environment_score: -1,
	social_score: -1,
	governance_score: -1,
	total_score: -1
};

export interface IGrades extends ISA {
	environment_grade: string;
	social_grade: string;
	governance_grade: string;
	total_grade: string;
}

export const NullGrades: IGrades = {
	environment_grade: "",
	social_grade: "",
	governance_grade: "",
	total_grade: ""
};

export const possibleGrades = ["D", "DD", "DDD", "C", "CC", "CCC", "B", "BB", "BBB", "A", "AA", "AAA"];

export interface ILevels extends ISA {
	environment_level: string;
	social_level: string;
	governance_level: string;
	total_level: string;
}

export const NullLevels: ILevels = {
	environment_level: "",
	social_level: "",
	governance_level: "",
	total_level: ""
};

export const possibleLevels = ["Low", "Medium", "High", "Excellent"];

export const scoreMetrics = ["environment_score", "social_score", "governance_score", "total_score"];
export const gradeMetrics = ["environment_grade", "social_grade", "governance_grade", "total_grade"];
export const levelsMetrics = ["environment_level", "social_level", "governance_level", "total_level"];