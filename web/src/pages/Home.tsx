import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";

interface HSectionProps {
	metric: string;
	factors: string[];
}

const HSection: React.FC<HSectionProps> = ({ metric, factors }) => {
	return (
		<div>
			<h1>{capitalizeFirstLetter(metric)}</h1>
			<p>Some examples of factors that go under {metric.toLowerCase()} include:</p>
			<ul>
				{factors.map((value, k) => {
					return <li key={k}>{value}</li>
				})}
			</ul>
		</div>
	);
};

const Home: React.FC = () => {
	return (
		<div className="flex flex-col my-16 mx-10">
			<div>
				<h1 className="text-xl">What is ESG?</h1>
			</div>
			<div>
				<HSection metric="Environment" factors={[
					"Energy Efficiency",
					"Green House Gas Emissions",
					"Deforestation",
					"Water Management"
				]}/>
				<HSection metric="Social" factors={[
					"Diversity and Inclusion",
					"Working Conditions",
					"Employee Relations",
					"Community Relations",
					"Human Rights",
					"Child Labor"
				]} />
				<HSection metric="Governance" factors={[
					"Board Structure",
					"Business ethics",
					"Shareholder democracy",
					"Executive compensation"
				]} />
			</div>
			<div>
				<h1 className="text-xl">Why are ESG ratings important?</h1>
			</div>
		</div>
	);
};

export default Home;