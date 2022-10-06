import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";
import IBCCompany from "../../../types/IBCCompany";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);


interface CompareBarChartProps {
	companyA: IBCCompany;
	companyB: IBCCompany;
}

const CompareBarChart: React.FC<CompareBarChartProps> = ({ companyA, companyB }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: "ESG Ratings Comparison",
			},
		},
	};

	const labels = ["Environment", "Social", "Governance", "Total"];
	const data: ChartData<"bar"> = {
		labels,
		datasets: [
			{
				label: companyA.name,
				data: companyA.ratings,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				borderColor: "black",
				borderWidth: 1
			},
			{
				label: companyB.name,
				data: companyB.ratings,
				backgroundColor: "rgba(53, 162, 235, 0.5)",
				borderColor: "black",
				borderWidth: 1
			}
		]
	};

	return (
		<div>
			<Bar data={data} options={options} />
		</div>
	);
};

export default CompareBarChart;