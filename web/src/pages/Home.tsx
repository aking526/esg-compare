import React from "react";
import { capitalizeFirstLetter } from "../utils/stringFunctions";
import HSection from "../components/HSection";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col my-16 mx-10">
			<div className="mb-1">
				<div>
					<h1 className="text-2xl">What is ESG?</h1>
				</div>
				<div className="flex flex-row">
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
			<div className="mt-2">
				<h1 className="text-2xl">Ratings Methodology</h1>
			</div>
		</div>
	);
};

export default Home;