import React, { useState, useEffect } from "react";
import CompareInputField from "../components/Compare/CompareInputField";
import CompareInputSelected from "../components/Compare/CompareInputSelected";
import CompaniesApi from "../api/CompaniesApi";
import { ICompanyData } from "../types/ICompanyData";
import { useQuery } from "@tanstack/react-query";
import QueryError from "../components/QueryError";

const Compare: React.FC = () => {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop: string) => searchParams.get(prop)
	});

	// @ts-ignore
	const companies = params.companies;
	const instate = companies ? [companies, undefined] : [undefined, undefined];

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
		if (tickers[0] && tickers[1]) setAllSelected(true);
	}, [tickers]);

	useEffect(() => {
		if (companies.includes(",")) {
			setTickers(companies.split(","));
		} else {
			setTickers([companies, undefined]);
		}
	}, [companies]);

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

	if (companies) {
		return (
			<>
			{ allSelected ?
				<div className="flex flex-row">
					<CompareInputSelected ticker={tickers[0]} />
					<CompareInputSelected ticker={tickers[1]} />
				</div>
						:
				<div className="flex flex-row justify-evenly my-16 mx-32">
					<CompareInputSelected ticker={companies} />
					<CompareInputField index={1} names={names.data} prevSelected={companies ? companies : undefined}/>
				</div>
			}
			</>
		);
	}

	return (
		<>
			{ companies ?
				<>
					{ allSelected ?
						<>
							{ dataLoaded ?
									<div>
									</div>
									:
									<div>
									</div>
							}
						</>
						:
						<>
							<div>
								<CompareInputField index={0} prevSelected={companies ? companies : undefined} names={names.data}/>
								<CompareInputField index={1} prevSelected={companies ? companies : undefined} names={names.data}/>
							</div>
						</>
				}
				</>
					:
					<>
					</>
			}

		</>
	);
};

export default Compare;