import ISA from "./ISA";

export interface IScores {
	environment_score : number;
	social_score: number;
	governance_score: number;
	total_score: number;
}

export interface IScoresTickers extends IScores, ISA {
	ticker: string;
}