import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

interface TopBarProps {
	names: string[][] | undefined;
}

const TopBar: React.FC<TopBarProps> = ({ names }) => {
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
		<div className="relative flex flex-row justify-between items-center py-2 px-3 w-screen bg-black font-modern text-xs text-white">
			<p>ESG Investing Tracker</p>
			{ names ? <SearchBar
							placeholder="Search by ticker or name..."
							data={names}
							styles={{
								containerWidth: "w-72",
								width: "w-64",
								inputHeight: "h-14",
								inputTextSize: "text-lg",
								inputPlaceholderTextSize: "text-base",
								ulHeight: "h-48",
								liTextSize: "text-lg",
								searchIconSize: "text-base",
								searchIconColor: "white"
							}} />
					:
					<div className="h-16 my-5" />
			}
			<p>{currDateTime}</p>
		</div>
	);
};

export default TopBar;