import React, { useState, useEffect } from "react";
import CInputField from "../components/Compare/CInputField";
import CInputSelected from "../components/Compare/CInputSelected";
import CompaniesApi from "../api/CompaniesApi";
import { ICompanyData } from "../types/ICompanyData";

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

	useEffect(() => {
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

		fetch().then(() => setDataLoaded(true));
	}, [allSelected]);

	if (go) {
		return (
			<>
			{ allSelected ?
				<div>
				</div>
						:
				<div className="flex flex-row my-16 mx-32">
					<CInputSelected ticker={go} />
					<CInputField />
				</div>
			}
			</>
		);
	}

	return (
		<>
			{ allSelected ?
				<div>
					<CInputField/>
					<CInputField/>
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