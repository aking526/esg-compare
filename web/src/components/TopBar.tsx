import React, { useState, useEffect, useCallback } from "react";

const TopBar: React.FC = () => {
	const [currDateTime, setCurrDateTime] = useState<string>("");

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
			<p>{currDateTime}</p>
		</div>
	);
};

export default TopBar;