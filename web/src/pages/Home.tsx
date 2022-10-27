import React from "react";
import HExSection from "../components/HExSection";
import EnvironmentWindmillImg from "../../assets/environment/windmill-ga48edb172_640.jpg";
import SocialGlobeImg from "../../assets/social/world-ga8f31bec6_640.jpg";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col my-10 mx-8 font-modern">
			<div className="mb-1">
				<div className="mb-2">
					<h1 className="text-2xl">What is ESG?</h1>
					<p className="text-lg">ESG stands for environmental, social, and governance. An ESG score is a measure of a company’s performance along these criteria.</p>
					<div className="flex flex-row border-2 p-2 shadow-light rounded-2xl">
						<div className="flex flex-row mt-2">
							<div className="flex flex-col">
								<b className="text-xl font-extrabold">(E) Environment</b>
								<div className="flex flex-col justify-center pr-6 pl-1 py-10">
									<p className="text-lg">Environmental criteria focus on a company’s environmental stewardship. They examine how a company uses natural resources and impacts the environment. Factors may include a company’s efforts to reduce greenhouse gases, decrease carbon emissions, conserve water, reduce waste and toxic emissions, and water pollution. </p>
									<HExSection metric="Environment" factors={[
										"Energy Efficiency",
										"Green House Gas Emissions",
										"Deforestation",
										"Water Management"
									]} styles="text-xs" />
								</div>
							</div>
							<img
								src={EnvironmentWindmillImg}
								alt="Tree Windmill Sustainability"
								className="rounded-2xl"
								width="384px"
								height="268.8px"
							/>
						</div>
					</div>
					<div className="flex flex-row mt-2 ml-2 shadow-light rounded-lg mt-3 p-2 bg-gray-200">
						<img
							src={SocialGlobeImg}
							alt="World Hands Unity"
							className="relative rounded-2xl m-2 float-right left-auto"
							width="300px"
							height="300px"
						/>
						<div className="flex flex-col ml-6">
							<b className="text-xl font-extrabold">(S) Social</b>
							<div className="flex flex-col justify-center pr-10 py-10">
								<p className="text-lg text-justify">Social criteria focus on how a company manages its relationships with its workforce and its community. They include a company’s labor relations, efforts on workplace diversity and equity, adherence to safe and healthy working conditions, and commitment to human rights.</p>
								<HExSection metric="Social" factors={[
									"Diversity and Inclusion",
									"Working Conditions",
									"Employee Relations",
									"Community Relations",
									"Human Rights",
									"Child Labor"
								]} styles="text-xs" />
							</div>
						</div>
					</div>
					<div className="flex flex-row mt-2 shadow-light rounded-lg mt-2 p-2">
						<div className="flex flex-col">
							<b className="text-xl font-extrabold">(G) Governance</b>
							<div className="flex flex-col justify-center pr-6 pl-1 py-19 text-justify py-10">
								<p className="text-lg text-justify">Governance criteria focuses on a company’s practices in respect of board diversity, business ethics, corruption and bribery, executive compensation policies and general risk management. </p>
									<HExSection metric="Governance" factors={[
										"Board Structure",
										"Business ethics",
										"Shareholder democracy",
										"Executive compensation"
									]} styles="text-xs" />
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5">
					<h1 className="text-xl">Why are ESG ratings important?</h1>
					<p>ESG ratings are important for two reasons because they facilitate socially responsible investing and they incentivize companies to be more socially responsible.  We don’t want to purchase products from companies that do bad things to our planet or the society.  Similarly, we should not invest in companies that are bad for the planet or the society.  If we care about addressing societal inequities and protecting the environment, we should invest our money in companies that care about the same things.  If we invest responsibly, it can also incentivize corporations from making efforts to do better for the planet and the society.  ESG ratings are measured differently and can be inconsistent from one agency to another.  This is not a perfect metric, and some argue the correlation between ESG ratings and sustainable business or financial performance is even tenuous. But without ESG ratings, how a company performs along the ESG criteria becomes invisible and unusable data. And by using a quantitative metric, we can raise awareness of the importance of this topic.  We can get companies to care about sustainability. </p>
				</div>
			</div>
			<div className="mt-2">
				<h1 className="text-2xl">Ratings Methodology</h1>
				<p>See full methodology here: <a className="text-blue-600" href="https://app.esgenterprise.com/uploads/ESG-Enterprise-Risk-Ratings-MethodologyV3.pdf">ESG Enterprise</a></p>
			</div>
		</div>
	);
};

export default Home;