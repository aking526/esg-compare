import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIndustryAvg } from "../hooks/useIndustryAvg";
import { useStockData } from "../hooks/useStockData";
import { Link, useNavigate } from "react-router-dom";
import CompareInputField from "../components/Compare/CompareInputField";
import CompareInputSelected from "../components/Compare/CompareInputSelected";
import CompaniesApi from "../api/CompaniesApi";
import { BlankCompanyData, ICompanyData } from "../types/ICompanyData";
import QueryError from "../components/QueryError";
import CompareLoading from "../components/Compare/CompareLoading";
import CompareBarChart from "../components/Compare/charts/CompareBarChart";
import CompareStockChart from "../components/Compare/charts/CompareStockChart";
import { XCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import SPCLenBtn from "../components/SPCLenBtn";

const Compare: React.FC = () => {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop: string) => searchParams.get(prop)
	});

	// @ts-ignore
	const companies = params.companies;
	const instate = companies ? [companies, undefined] : [undefined, undefined];

	const [tickers, setTickers] = useState<string[]>(instate);

	/*
	Store the previously selected tickers in localStorage
	Delete them if user goes to different page
	 */
	useEffect(() => {
		if (!companies && window.localStorage.getItem("compare_tickers")) {
			// @ts-ignore
			setTickers(window.localStorage.getItem("compare_tickers").split(","));
		}

		return () => {
			window.localStorage.setItem("compare_tickers", ["",""].join(","));
		};
	}, []);

	useEffect(() => {
		window.localStorage.setItem("compare_tickers", tickers.join(","));
	}, [tickers]);

	const [allSelected, setAllSelected] = useState(false);

	const [data, setData] = useState<ICompanyData[]>([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	const [spcLen, setSpcLen] = useState("1 month");

	const stock0 = useStockData(tickers[0], spcLen);
	const stock1 = useStockData(tickers[1], spcLen);

	// @ts-ignore
	if (stock1?.isError) return <QueryError message={stock1?.error.message} />;
	// @ts-ignore
	if (stock0?.isError) return <QueryError message={stock0?.error.message} />;

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const names = useQuery<string[][], Error>(['names'], CompaniesApi.getNames);
	if (names.isError) {
		// @ts-ignore
		return <QueryError message={names.error.message} />;
	}

	useEffect(() => {
		if (tickers[0] && tickers[1] && tickers[0] !== "" && tickers[1] !== "") {
			setAllSelected(true);
			return;
		}

		setAllSelected(false);
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
		setSpcLen("1 month");
		if (!allSelected) return;

		const fetch = async () => {
			setDataLoaded(false);
			let newArr = [];
			for (let i = 0; i < 2; i++) {
				const cachedData: ICompanyData | undefined = queryClient.getQueryData([`${tickers[i]}_data`]);
				if (cachedData) {
					newArr.push(cachedData[0]);
					continue;
				}
				const data = await CompaniesApi.fetchCompanyData(tickers[i]);
				newArr.push(data[0]);
			}
			setData(newArr);
		};

		fetch().then(() => {
			setDataLoaded(true);
		});
	}, [allSelected]);

	const copyTickers = () => {
		let arr = [];
		for (let i = 0; i < 2; i++) {
			arr.push(tickers[i]);
		}
		return arr;
	};

	const newTickers = (index: number, t: string) => {
		let arr = copyTickers();
		arr[index] = t;
		setTickers(arr);
	};

	const handleBackButtonClicked = () => {
		setTickers(["", ""]);
		setData([]);
		setCompareToIA(false);
	};

	const [compareToIA, setCompareToIA] = useState(false);
	const IA = useIndustryAvg(data[0] ? data[0].industry : undefined);
	const handleCompareToIndustryClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
		setCompareToIA(true);
	};

	useEffect(() => {
		if (!compareToIA || !tickers[0]) return;

		const fetchOne = async () => {
			setDataLoaded(false);
			const cachedData: ICompanyData | undefined = queryClient.getQueryData([`${tickers[0]}_data`]);
			if (cachedData) {
				setData([cachedData[0], BlankCompanyData]);
				return;
			}
			const cd = await CompaniesApi.fetchCompanyData(tickers[0]);
			setData([cd[0], BlankCompanyData]);
		};

		fetchOne().then(() => setDataLoaded(true));
	}, [compareToIA]);

	const [sbFocused, setSbFocused] = useState<boolean[]>([false, false]);

	return (
		<div>
			{ (allSelected || compareToIA) &&
				<div className="relative flex flex-row rounded-br-2xl bg-black p-1.5 w-fit" onClick={handleBackButtonClicked}>
					<div className="flex items-center justify-center">
						<ArrowLeftCircleIcon className="w-8 h-8" color="white" />
					</div>
					<p className="m-2 text-white">Back</p>
				</div>
			}
			<div className={`font-modern ${ allSelected ? "my-8" : "my-16" } mx-24 px-5 py-8 ${ allSelected || compareToIA ? "bg-gray-50" : "bg-gray-100" } rounded-2xl shadow-light`}>
				{ compareToIA &&
					<div>
						{ data[0] && !IA.isLoading ?
						<div className="flex flex-col">
							<div className="flex flex-row justify-center items-center">
								<div className="flex flex-col mx-1">
									<div>
										<Link to={`/company/${tickers[0].toLowerCase()}`}>
											<span className="text-3xl font-extrabold mr-2">{data[0].name}</span>
											<span className="ml-2 text-xl">({tickers[0].toUpperCase()})</span>
										</Link>
									</div>
								</div>
								<p className="mx-4">Compared To</p>
								<div className="flex flex-col mx-1">
									<h1 className="text-3xl font-extrabold">{data[0].industry} Industry Average</h1>
								</div>
							</div>
							<CompareBarChart
								companyA={{
									ticker: tickers[0],
									name: data[0].name,
									ratings: [data[0].environment_score, data[0].social_score, data[0].governance_score, data[0].total_score]
								}}
								companyB={{
									ticker: "--IA",
									name: `${data[0].industry} Industry Average`,
									ratings: [IA.avgScores.environment_score, IA.avgScores.social_score, IA.avgScores.governance_score, IA.avgScores.total_score]
								}}
							/>
						</div>
								:
						<CompareLoading tickers={[tickers[0], "Industry Average"]} />
					}
					</div>
				}
				{ allSelected && !compareToIA ?
					<div>
						{ dataLoaded && data[0] && data[1] && tickers[0] && tickers[1] ?
							<div className="flex flex-col">
								<div className="flex flex-row justify-evenly">
									{ data.map((dat: ICompanyData, idx) => {
										const ticker = tickers[idx];
										return (
											<div className="flex flex-row justify-between mx-2" key={idx}>
												<div className="flex justify-center mr-3.5">
													<XCircleIcon className="w-5 h-5" onClick={() => {
														if (ticker === companies) navigate("/compare");
														newTickers(idx, "");
													}} />
												</div>
												<div className="flex flex-col mr-5">
													<div className="flex flex-row">
														<h1 className="mr-2 font-extrabold text-3xl">{
															<Link to={`/company/${ticker}`}>{dat.name}</Link>
														}</h1>
														<h2 className="ml-2 mt-1.5 text-2xl">({ticker?.toUpperCase()})</h2>
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
										<CompareBarChart
											companyA={{
												ticker: tickers[0],
												name: data[0].name,
												ratings: [data[0].environment_score, data[0].social_score, data[0].governance_score, data[0].total_score]
											}}
											companyB={{
												ticker: tickers[1],
												name: data[1].name,
												ratings: [data[1].environment_score, data[1].social_score, data[1].governance_score, data[1].total_score]
											}}
										/>
									</div>
									<div className="w-[1200px] h-[400px]">
										{ stock0 && stock1 && !stock0.isLoading && !stock1.isLoading &&
											<CompareStockChart
												tickerA={tickers[0]}
												pricesA={stock0.prices}
												tickerB={tickers[1]}
												pricesB={stock1.prices}
											/>
										}
									</div>
									<div className="flex flex-row justify-between">
										<SPCLenBtn
											initialValue={false}
											text="5 days"
											currSelected={spcLen}
											set={setSpcLen}
										/>
										<SPCLenBtn
											initialValue={true}
											text="1 month"
											currSelected={spcLen}
											set={setSpcLen}
										/>
										<SPCLenBtn
											initialValue={false}
											text="6 months"
											currSelected={spcLen}
											set={setSpcLen}
										/>
										<SPCLenBtn
											initialValue={false}
											text="1 year"
											currSelected={spcLen}
											set={setSpcLen}
										/>
										<SPCLenBtn
											initialValue={false}
											text="5 years"
											currSelected={spcLen}
											set={setSpcLen}
										/>
									</div>
								</div>
								:
								<CompareLoading tickers={tickers} />
						}
					</div>
						:
					<>
						{ !compareToIA &&
							<>
								{ companies ?
									<div className="flex flex-row justify-evenly my-16 mx-32 px-18 py-36">
										<CompareInputSelected ticker={companies} handleClick={() => {
											navigate("/compare");
											newTickers(0, "");
										}}/>
										{ !tickers[1] ?
											<CompareInputField
												index={1}
												names={names.data}
												prevSelected={companies ? companies : undefined}
												passBack={(t: string) => newTickers(1, t)}
												hasIndustryAvgOption={true}
												onClick={handleCompareToIndustryClicked}
												otherFocused={false}
												passBackFocused={() => null} // does not need to pass back focused because other one is already selected
											/>
											:
											<CompareInputSelected
												ticker={tickers[1]}
												handleClick={() => newTickers(1, "")}
											/>
										}
									</div>
										:
									<div className="flex flex-row items-center justify-evenly px-18 py-36">
										{ !tickers[0] ?
											<CompareInputField
												index={0}
												prevSelected={companies ? companies : undefined}
												names={names.data}
												passBack={(t: string) => newTickers(0, t)}
												hasIndustryAvgOption={false}
												otherFocused={sbFocused[1]}
												passBackFocused={(f: boolean) => {
													let fc = [];
													for (let i = 0; i < sbFocused.length; i++) {
														fc.push(sbFocused[i]);
													}
													fc[0] = f;
													setSbFocused(fc);
												}}
											/>
												:
											<CompareInputSelected
												ticker={tickers[0]}
												handleClick={() => newTickers(0, "")}
										/>
										}
										{ !tickers[1] ?
											<CompareInputField
												index={1}
												prevSelected={companies ? companies : undefined}
												names={names.data}
												passBack={(t: string) => newTickers(1, t)}
												hasIndustryAvgOption={true}
												onClick={handleCompareToIndustryClicked}
												otherFocused={sbFocused[0]}
												passBackFocused={(f: boolean) => {
													let fc = [];
													for (let i = 0; i < sbFocused.length; i++) {
														fc.push(sbFocused[i]);
													}
													fc[1] = f;
													setSbFocused(fc);
												}}
											/>
												:
											<CompareInputSelected
												ticker={tickers[1]}
												handleClick={() => newTickers(1, "")}
											/>
										}
									</div>
								}
							</>
						}
					</>
				}
			</div>
		</div>
	);
};

export default Compare;