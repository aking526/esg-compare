import React from "react";
import { useLocation } from "react-router-dom";

interface NotFoundProps {
	ticker?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ ticker }) => {
	const location = useLocation();

	return (
		<div className="flex flex-col items-center text-3xl bg-contrast-gray font-modern mx-[13.33vw] my-[18.5vh] px-[7.78vw] py-[15vh]">
			<p>Error: 404 - Not Found.</p>
			{ ticker && ticker !== "not selected" && <p>{ticker.toUpperCase()} is not supported by this website.</p> }
			{ !ticker && location.pathname.includes("/company") && <p>You must select a company.</p> }
			<p>Please navigate to a different page.</p>
		</div>
	);
};

export default NotFound;