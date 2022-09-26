import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface CSearchBarProps {
	placeholder: string;
	data: string[][] | undefined;
	passBack: (ticker: string) => void;
}

// data[i][0] ==> ticker
// data[i][1] ==> name

const CSearchBar: React.FC<CSearchBarProps> = ({ placeholder, data, passBack }) => {
	const [curr, setCurr] = useState<string>("");
	const [filteredData, setFilteredData] = useState<string[][] | undefined>(data);
	const [focused, setFocused] = useState<boolean>(false);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurr(event.target.value);
	const onFocus = () => setFocused(true);

	const onSelect = (ticker: string) => {
		console.log(ticker);
		passBack(ticker);
	};

	// Handles whether the search box is clicked or not
	useEffect(() => {
		if (curr.length !== 0 || !focused) return;
		setFilteredData(data); // Resets the filtered data to show all options

		const handlePointerDown = (event: PointerEvent) => {
			if (!focused) return;
			setFocused(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);

		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [focused]);

	// Sets new filter when curr is changed
	useEffect(() => {
		const newFilter = data?.filter((value: string[]) => {
			return value[0].toLowerCase().includes(curr.toLowerCase()) || value[1].toLowerCase().includes(curr.toLowerCase());
		});

		if (curr === "") setFilteredData([]);
		else setFilteredData(newFilter);
	}, [curr]);

	// adds an event listener when filteredData is change
	useEffect(() => { // handled this way because of state was not updating
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Enter") return;

			if (filteredData) {
				onSelect(filteredData[0][0]);
			}
		};

		document.addEventListener("keydown", handleKeyDown, true);

		return () => document.removeEventListener("keydown", handleKeyDown, true);
	}, [filteredData]);

	const handleOnPointerDown = (event: React.PointerEvent<HTMLDivElement>) => event.stopPropagation();

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (filteredData) {
				onSelect(filteredData[0][0]);
			}
		};

		document.getElementById("selectButton")?.addEventListener("click", handleClick);
		document.getElementById("liItem")?.addEventListener("click", handleClick);

		return document.getElementById("selectButton")?.removeEventListener("click", handleClick) && document.getElementById("liItem")?.removeEventListener("click", handleClick);
	}, []);

	return (
			<div className="flex flex-row justify-center my-1 font-modern text-black mr-auto ml-auto w-44 p-5" onPointerDown={handleOnPointerDown}>
				<div className="flex flex-col">
					<input
							className="bg-slate-200 w-40 h-14 text-sm rounded-xl border-2 border-black px-3 hover:bg-white hover:border-sky-700 placeholder:text-xs"
							onChange={onChange}
							onFocus={onFocus}
							value={curr}
							type="text"
							placeholder={placeholder}
					/>
					<div className="relative z-10">
						{(( filteredData && filteredData.length !== 0 && curr.length !== 0) || focused) &&
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <ul className="relative flex flex-col ml-auto mr-auto bg-white rounded-lg border-2 border-cyan-50 w-40 h-20 pt-1.5 drop-shadow-xl overflow-hidden overflow-y-auto">
										{filteredData && filteredData.slice(0, 15).map((value: string[], key: number) => (
												<li className="text-sm m-2 hover:bg-slate-100" key={key} id="liItem">{value[1]} - {value[0].toUpperCase()}</li>
										))}
                  </ul>
                </div>
						}
					</div>
				</div>
				<div className="p-2 m-1 mt-2">
					<FontAwesomeIcon icon={ faRightToBracket } id="selectButton"/>
				</div>
			</div>
	);
};

export default CSearchBar;
