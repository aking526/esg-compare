import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import RankingsTable from "../components/Rankings/RankingsTable";
import DataRefToText from "../mods/DataRefToText";
import MetricBtn from "../components/MetricBtn";
import CompanyApi from "../api/CompanyApi";
import { useQueryClient, useQuery } from '@tanstack/react-query';
import QueryError from "../components/QueryError";

const defaultMetric = "total_score";
const FilterBtnStyles = "border-2 rounded-xl border-black p-1 my-0.5";

const Rankings: React.FC = () => {
  const [rankings, setRankings] = useState<ICompanyData[]>([]);
  const [metric, setMetric] = useState<string>(defaultMetric);

  const queryClient = useQueryClient();

  const names = useQuery<string[][], Error>(['names'], CompanyApi.getNames);
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

  if (names.isError) {
    return <QueryError message={names.error.message} />
  }

  if (rankingsIsError) {
    return <QueryError message={rankingsError.message} />
  }

  return (
    <div className="relative w-screen bg-white mt-5">
      { !names.isLoading ? <SearchBar
        placeholder="Search by ticker or name..."
        data={names.data}
        styles={{
          containerWidth: "w-72",
          width: "w-64",
          inputHeight: "h-14",
          inputTextSize: "text-lg",
          inputPlaceholderTextSize: "text-base",
          ulHeight: "h-48",
          liTextSize: "text-lg",
          searchIconSize: "text-base"
        }} />
          :
          <div className="h-16 my-5" />
      }
      <div className="relative">
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
          </div>
            : <RankingsLoading metric={DataRefToText[metric]} /> }
      </div>
    </div>
  );
};

export default Rankings;
