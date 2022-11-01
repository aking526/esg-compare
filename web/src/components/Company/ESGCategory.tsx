import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { possibleGrades, possibleLevels } from "../../types/ESGDataInterfaces";

interface ESGCategoryProps {
	id: string;
	width: number;
	passBack: Function;
	name: string;
	industry: string;
	category: string;
	score: number;
	grade: string;
	level: string;
	avg_score: number;
	avg_grade: string;
	avg_level: string;
	best_score: number;
	best_grade: string;
	best_level: string;
}

const ESGCategory: React.FC<ESGCategoryProps> = ({ id, passBack, width, name, industry, category, score, grade, level, avg_score, avg_grade, avg_level, best_score, best_grade, best_level }) => {
	useEffect(() => {
		passBack(document.getElementById(id)?.offsetWidth);
	}, [document.getElementById(id)?.offsetWidth]);

	const [styles, setStyles] = useState<any>({
		width: (width + 1).toString() + "px"
	});

	useEffect(() => {
		if (width === 0) setStyles({});
		else setStyles({ width: (width + 1).toString() + "px" });
	}, [width]);

	return (
			// @ts-ignore
		<div id={id} className="relative my-1 mr-6 border-2 border-black p-3 h-min hover:shadow-light w-[275px]" style={width > 200 ? styles : {}}>
			<u className="text-xl">{category}</u>
			<div className="flex flex-col mt-1.5 justify-between">
				<div className="my-2"><strong>{`${category} Score: `}</strong> <span className={score >= avg_score ? "text-green-600" : "text-red-600"}  data-tip data-for={`score-tip-${category.toLowerCase()}`}>{score}</span></div>
				<ReactTooltip id={`score-tip-${category.toLowerCase()}`} place="top" effect="solid">
					<p className="mr-1">Industry Mean: {avg_score}</p>
					<p className="ml-1">Industry Best: {best_score}</p>
				</ReactTooltip>
				<div className="my-2"><strong>{`${category} Grade: `}</strong> <span className={possibleGrades.indexOf(grade) > possibleGrades.indexOf(avg_grade) ? "text-green-600" : grade === avg_grade ? "text-gray-600" : "text-red-600"} data-tip data-for={`grade-tip-${category.toLowerCase()}`}>{grade}</span></div>
				<ReactTooltip id={`grade-tip-${category.toLowerCase()}`} place="right" effect="solid">
					<p className="mr-1">Industry Mean: {avg_grade}</p>
					<p className="ml-1">Industry Best: {best_grade}</p>
				</ReactTooltip>
				<div className="my-2"><strong>{`${category} Level: `}</strong> <span className={possibleLevels.indexOf(level) > possibleLevels.indexOf(avg_level) ? "text-green-600" : level === avg_level ? "text-gray-600" : "text-red-600"} data-tip data-for={`level-tip-${category.toLowerCase()}`}>{level}</span></div>
				<ReactTooltip id={`level-tip-${category.toLowerCase()}`} place="bottom" effect="solid">
					<p className="mr-1">Industry Mean: {avg_level}</p>
					<p className="ml-1">Industry Best: {best_level}</p>
				</ReactTooltip>
			</div>
		</div>
	);
};

export default ESGCategory;