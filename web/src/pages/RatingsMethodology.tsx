import React from "react";

const RatingsMethodology: React.FC = () => {
	return (
		<div className="flex flex-col font-modern">
			<div>
				<h1>Environment</h1>
			</div>
			<div>
				<h1>Social</h1>
			</div>
			<div>
				<h1>Governance</h1>
			</div>
			<p>See full document: <span className="text-blue-600"><a href="https://app.esgenterprise.com/uploads/ESG-Enterprise-Risk-Ratings-MethodologyV3.pdf">ESG Enterprise Ratings Methodology</a></span></p>
		</div>
	);
};

export default RatingsMethodology;