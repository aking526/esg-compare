import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const TopBar: React.FC = () => {
	const [currDateTime, setCurrDateTime] = useState<string>("");
	const [showSB, setShowSB] = useState<boolean>(false);

	const location = useLocation();

	useEffect(() => {
		if (location.pathname !== "/") {
			setShowSB(true);
		}
	}, [location.pathname]);

	const currCallback = useCallback(() => {
		const dt = new Date();
		setCurrDateTime(dt.toLocaleString());
	}, [currDateTime]);

	useEffect(() => {
		const handle = setInterval(currCallback, 100);
		return () => clearInterval(handle);
	}, []);

	return (
		<div className="relative flex flex-row justify-between top-0 p-3 w-screen bg-black font-modern text-xs text-white">
			<p>ESG Investing Tracker</p>
			{/*{ showSB ? : }*/}
			<p>{currDateTime}</p>
		</div>
	);
};

export default TopBar;