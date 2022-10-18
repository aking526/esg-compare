import React from "react";
import { TNewsInfo } from "../../types/StockFinancialInterfaces";

interface NewsSectionProps {
	currNews: TNewsInfo;
}

const NewsSection: React.FC<NewsSectionProps> = ({ currNews }) => {
	return (
		<div className="flex flex-col m-3">
			<h3 className="mb-1.5"><a href={currNews.url}>{currNews.headline}</a></h3>
			<img width={100} height={100} src={currNews.image} alt="" />
			<p>Source: {currNews.source}</p>
		</div>
	);
};

export default NewsSection;