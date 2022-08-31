import React from "react";
import TextDataFormat from "../TextDataFormat";

interface ESGCategoryProps {
	category: string;
	score: number;
	grade: string;
	level: string;
}

const ESGCategory: React.FC<ESGCategoryProps> = ({ category, score, grade, level }) => {
	return (
		<div className="my-1 mr-6 border-2 border-black p-3">
			<u className="text-2xl">{category}</u>
			<TextDataFormat styles="my-2" text={`${category} Score:`} data={score} />
			<TextDataFormat styles="my-2" text={`${category} Grade:`} data={grade} />
			<TextDataFormat styles="my-2" text={`${category} Level:`} data={level} />
		</div>
	);
};

export default ESGCategory;