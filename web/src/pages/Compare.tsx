import React, { useState, useEffect } from "react";
import CInputField from "../components/Compare/CInputField";
import CInputSelected from "../components/Compare/CInputSelected";
import CompaniesApi from "../api/CompaniesApi";
import { ICompanyData } from "../types/ICompanyData";
import { useQuery } from "@tanstack/react-query";
import QueryError from "../components/QueryError";

const Compare: React.FC = () => {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop: string) => searchParams.get(prop)
	});

	// @ts-ignore
	const go = params.go;
	const instate = go ? [go, undefined] : [undefined, undefined];

	const [tickers, setTickers] = useState<string[]>(instate);
	const [allSelected, setAllSelected] = useState(false);

	const [data, setData] = useState<ICompanyData[]>([]);
	const [dataLoaded, setDataLoaded] = useState(false);


	const names = useQuery<string[][], Error>(['names'], CompaniesApi.getNames);
	if (names.isError) {
		// @ts-ignore
		return <QueryError message={names.error.message} />;
	}

	useEffect(() => {
		console.log("In Compare component: " + tickers);
		if (tickers[0] && tickers[1]) setAllSelected(true);
	}, [tickers]);

	useEffect(() => {
		const fetch = async () => {
			let newArr = [];
			for (let i = 0; i < 2; i++) {
				const data = await CompaniesApi.fetchCompanyData(tickers[i]);
				newArr.push(data);
			}
			setData(newArr);
		};

		if (allSelected) fetch().then(() => setDataLoaded(true));
	}, [allSelected]);

	const handleSelected = (selected: string, index: number) => {
		let newT = tickers;
		newT[index] = selected;
		setTickers(newT);
	};

	if (go) {
		return (
			<>
			{ allSelected ?
				<div className="flex flex-row">
					<CInputSelected ticker={tickers[0]} />
					<CInputSelected ticker={tickers[1]} />
				</div>
						:
				<div className="flex flex-row justify-evenly my-16 mx-32">
					<CInputSelected ticker={go} />
					<CInputField passBack={handleSelected} index={1} names={names.data}/>
				</div>
			}
			</>
		);
	}

	return (
		<>
			{ allSelected ?
				<div>
					<CInputField passBack={handleSelected} index={0} names={names.data}/>
					<CInputField passBack={handleSelected} index={1} names={names.data}/>
				</div>
					:
				<>
					{ dataLoaded ?
							<div>
							</div>
							:
							<div>

							</div>
					}
				</>
			}
		</>
	);
};

export default Compare;