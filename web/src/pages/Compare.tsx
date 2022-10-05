import React, { useState, useEffect } from "react";
import CompareInputField from "../components/Compare/CompareInputField";
import CompareInputSelected from "../components/Compare/CompareInputSelected";
import CompaniesApi from "../api/CompaniesApi";
import { ICompanyData } from "../types/ICompanyData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryError from "../components/QueryError";
import CompareLoading from "../components/Compare/CompareLoading";
import CompareBarChart from "../components/Compare/charts/CompareBarChart";

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

	const queryClient = useQueryClient();

	const names = useQuery<string[][], Error>(['names'], CompaniesApi.getNames);
	if (names.isError) {
		// @ts-ignore
		return <QueryError message={names.error.message} />;
	}

	useEffect(() => {
		if (tickers[0] && tickers[1]) setAllSelected(true);
	}, [tickers]);

	useEffect(() => {
		if (!companies) return;

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
				const cachedData: ICompanyData | undefined = queryClient.getQueryData([`${tickers[i]}_data`]);
				if (cachedData) {
					newArr.push(cachedData);
					continue;
				}
				const data = await CompaniesApi.fetchCompanyData(tickers[i]);
				newArr.push(data[0]);
			}
			setData(newArr);
		};

		if (allSelected) fetch().then(() => setDataLoaded(true));
	}, [allSelected]);

	return (
		<div className="font-modern my-16 mx-32 p-5 bg-slate-200 rounded-2xl">
			{ companies ?
				<>
					{ allSelected ?
						<div className="">
							{ dataLoaded ?
								<div className="flex flex-col">
									<div className="flex flex-row justify-evenly">
										{data.map((dat: ICompanyData, idx) => {
											const ticker = tickers[idx];
											return (
												<div className="flex flex-row justify-between">
													<div className="flex flex-col mx-5" key={idx}>
														<div className="flex flex-row">
															<h1 className="mr-2 font-extrabold text-4xl">{
																dat.weburl ?
																		<a href={dat.weburl}>{dat.name}</a>
																		:
																		<>{dat.name}</>
															}</h1>
															<h2 className="ml-2 mt-2 text-2xl">({ticker.toUpperCase()})</h2>
														</div>
														<p className="text-base">{dat.exchange}</p>
														<div className="flex flex-row text-xs">
															<p className="font-extrabold mr-1">Industry:</p>
															<p>{dat.industry}</p>
														</div>
													</div>
													<div className="border-2 border-black">
														<img
																className="w-20 h-20"
																src={dat.logo}
																alt=""
														/>
													</div>
												</div>
											);
										})}
									</div>
									<div>
										<CompareBarChart companyA={{
											ticker: tickers[0],
											name: data[0].name,
											ratings: [data[0].environment_score, data[0].social_score, data[0].governance_score, data[0].total_score]
										}}
									 	companyB={{
											ticker: tickers[1],
											name: data[1].name,
											ratings: [data[1].environment_score, data[1].social_score, data[1].governance_score, data[1].total_score]
										}} />
									</div>
									{/*<CompareInputSelected ticker={tickers[0]}/>*/}
									{/*<CompareInputSelected ticker={tickers[1]}/>*/}
								</div>
								:
								<CompareLoading tickers={tickers} />
							}
						</div>
						:
						<div className="flex flex-row justify-evenly my-16 mx-32">
							<CompareInputSelected ticker={companies} />
							<CompareInputField index={1} names={names.data} prevSelected={companies ? companies : undefined}/>
						</div>
					}
				</>
					:
				<div className="flex flex-row">
					<CompareInputField index={0} prevSelected={companies ? companies : undefined} names={names.data}/>
					<CompareInputField index={1} prevSelected={companies ? companies : undefined} names={names.data}/>
				</div>
			}
		</div>
	);
};

export default Compare;