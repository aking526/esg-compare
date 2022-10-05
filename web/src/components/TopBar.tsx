import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

interface TopBarProps {
	names: string[][] | undefined;
}

const TopBar: React.FC<TopBarProps> = ({ names }) => {
	const [currDateTime, setCurrDateTime] = useState<string>((new Date()).toLocaleString());
	const [onComparePage, setOnComparePage] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes("compare")) setOnComparePage(true);
		else setOnComparePage(false);
	}, [location]);

	const currCallback = useCallback(() => {
		const dt = new Date();
		setCurrDateTime(dt.toLocaleString());
	}, [currDateTime]);

	useEffect(() => {
		const handle = setInterval(currCallback, 100);
		return () => clearInterval(handle);
	}, []);

	return (
		<div className="relative flex flex-row justify-between items-center py-2 px-3 w-screen bg-black font-modern text-xs text-white">
			<p className="text-base">ESG Investing Tracker</p>
			<SearchBar
				placeholder="Search by ticker or name..."
				data={names}
				styles={{
					containerWidth: "w-72",
					width: "w-64",
					inputHeight: "h-10",
					inputTextSize: "text-base",
					inputPlaceholderTextSize: "text-base",
					ulHeight: "h-48",
					liTextSize: "text-base",
					searchIconSize: "text-base",
					searchIconColor: "white"
				}}
      />
			<p className="text-base">{currDateTime}</p>
		</div>
	);
};

export default TopBar;