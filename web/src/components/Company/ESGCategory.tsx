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
			<u className="text-xl">{category}</u>
			<TextDataFormat text={`${category} Score:`} data={score} />
			<TextDataFormat text={`${category} Grade:`} data={grade} />
			<TextDataFormat text={`${category} Level:`} data={level} />
		</div>
	);
};

export default ESGCategory;