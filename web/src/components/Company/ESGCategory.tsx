import React from "react";
import ReactTooltip from "react-tooltip";
import { possibleGrades, possibleLevels } from "../../types/ESGDataInterfaces";

interface ESGCategoryProps {
	name: string;
	industry: string;
	category: string;
	score: number;
	grade: string;
	level: string;
	avg_score: number;
	avg_grade: string;
	avg_level: string;
}

const ESGCategory: React.FC<ESGCategoryProps> = ({ name, industry, category, score, grade, level, avg_score, avg_grade, avg_level }) => {
	return (
		<div className="my-1 mr-6 border-2 border-black p-3">
			<u className="text-2xl">{category}</u>

			<div className="my-2"><strong>{`${category} Score: `}</strong> <span className={score >= avg_score ? "text-green-500" : "text-red-500"}  data-tip data-for={`score-tip-${category.toLowerCase()}`}>{score}</span></div>
			<ReactTooltip id={`score-tip-${category.toLowerCase()}`} place="top" effect="solid">
				{name} has a {score >= avg_score ? "higher" : "lower"} {category.toLowerCase()} score than the avg of amongst {industry.toLowerCase()} companies
			</ReactTooltip>

			<div className="my-2"><strong>{`${category} Grade: `}</strong> <span className={possibleGrades.indexOf(grade) > possibleGrades.indexOf(avg_grade) ? "text-green-500" : grade === avg_grade ? "text-gray-500" : "text-red-500"} data-tip data-for={`grade-tip-${category.toLowerCase()}`}>{grade}</span></div>
			<ReactTooltip id={`grade-tip-${category.toLowerCase()}`} place="right" effect="solid">
				{name} has a {possibleGrades.indexOf(grade) > possibleGrades.indexOf(avg_grade) ? "higher" : grade === avg_grade ? "normal" : "lower" } {category.toLowerCase()} grade compared to most {industry.toLowerCase()} companies
			</ReactTooltip>

			<div className="my-2"><strong>{`${category} Level: `}</strong> <span className={possibleLevels.indexOf(level) > possibleLevels.indexOf(avg_level) ? "text-green-500" : level === avg_level ? "text-gray-500" : "text-red-500"} data-tip data-for={`level-tip-${category.toLowerCase()}`}>{level}</span></div>
			<ReactTooltip id={`level-tip-${category.toLowerCase()}`} place="bottom" effect="solid">
				{name} has a {possibleLevels.indexOf(level) > possibleLevels.indexOf(avg_level) ? "higher" : level === avg_level ? "normal" : "lower" } {category.toLowerCase()} level compared to most {industry.toLowerCase()} companies
			</ReactTooltip>
		</div>
	);
};

export default ESGCategory;