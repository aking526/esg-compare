import React, { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import RankingsTable from "../components/Rankings/RankingsTable";
import MetricBtn from "../components/Rankings/MetricBtn";
import FilterCheckbox from "../components/Rankings/FilterCheckbox";
import DataRefToText from "../mods/DataRefToText";
import CompanyApi from "../proxy/CompanyApi";

import QueryError from "../components/QueryError";
import FilterDropdown from "../components/Rankings/FilterDropdown";
import MyOption from "../types/MyOption";

const Rankings: React.FC = () => {
  const defaultMetric = "total_score";
  const FilterBtnStyles = "border-2 rounded-xl border-black p-1 my-0.5";

  const [rankings, setRankings] = useState<ICompanyData[]>([]);
  const [metric, setMetric] = useState<string>(defaultMetric);

  const queryClient = useQueryClient();

  const { isLoading: rankingsLoading, isError: rankingsIsError, error: rankingsError } = useQuery<ICompanyData[], Error>([`${metric}_ranking`], async () => {
    return CompanyApi.fetchRankings(metric);
  }, {
    onSuccess: (res) => {
      setRankings(res);
    }
  });

  useEffect(() => {
    const cachedRanking: ICompanyData[] | undefined = queryClient.getQueryData([`${metric}_ranking`]);
    if (cachedRanking) setRankings(cachedRanking);
  }, [metric]);

  if (rankingsIsError) {
    return <QueryError message={rankingsError.message} />
  }

  const onChange = () => {};

  const options: MyOption[] = [
    { value: "ocean1", label: "Technology" },
    { value: "blue", label: "Media" },
    { value: "purple", label: "Automobiles" },
  ];

  return (
    <div className="relative w-screen bg-slate-100 py-5">
      { !rankingsLoading ?
        <div className="flex flex-row">
          <div className="font-modern border-2 w-fit m-2 p-2">
            <u className="text-xl">Metrics:</u>
            <MetricBtn
              text="Total Score"
              thisMetric={"total_score"}
              currMetric={metric}
              setMetric={setMetric}
              styles={FilterBtnStyles}
            />
            <MetricBtn
              text="Environment Score"
              thisMetric={"environment_score"}
              currMetric={metric}
              setMetric={setMetric}
              styles={FilterBtnStyles}
            />
            <MetricBtn
              text="Social Score"
              thisMetric={"social_score"}
              currMetric={metric}
              setMetric={setMetric}
              styles={FilterBtnStyles}
            />
            <MetricBtn
              text="Governance Score"
              thisMetric={"governance_score"}
              currMetric={metric}
              setMetric={setMetric}
              styles={FilterBtnStyles}
            />
          </div>
          <RankingsTable rankings={rankings} metric={metric} />
          <div className="flex flex-col m-2 p-2 border-2 w-96">
            <u className="text-xl">Filters: </u>
            <FilterDropdown options={options}/>
          </div>
        </div>
          : <RankingsLoading metric={DataRefToText[metric]}/> }
    </div>
  );
};

export default Rankings;
