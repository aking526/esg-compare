import React from "react";
import ReactTooltip from "react-tooltip";

interface ESGCategoryProps {
	name: string;
	industry: string;
	category: string;
	score: number;
	grade: string;
	level: string;
	avg_score: number;
}

const ESGCategory: React.FC<ESGCategoryProps> = ({ name, industry, category, score, grade, level, avg_score }) => {
	return (
		<div className="my-1 mr-6 border-2 border-black p-3">
			<u className="text-2xl">{category}</u>
			<p className="my-2" data-tip data-for={`score-tip-${category.toLowerCase()}`}><strong>{`${category} Score: `}</strong> <span className={score >= avg_score ? "text-green-500" : "text-red-500"}>{score}</span></p>
			<ReactTooltip id={`score-tip-${category.toLowerCase()}`}>
				{name} has a {score >= avg_score ? "higher" : "lower"} {category.toLowerCase()} score than most {industry.toLowerCase()} companies
			</ReactTooltip>

			<p className="my-2"><strong>{`${category} Grade: `}</strong> {grade}</p>
			<p className="my-2"><strong>{`${category} Level: `}</strong> {level}</p>
		</div>
	);
};

export default ESGCategory;