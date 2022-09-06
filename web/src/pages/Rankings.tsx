import React, { useState, useEffect } from "react";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import RankingsTable from "../components/Rankings/RankingsTable";
import DataRefToText from "../mods/DataRefToText";
import MetricBtn from "../components/MetricBtn";
import CompanyApi from "../api/CompanyApi";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import QueryError from "../components/QueryError";

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

  return (
    <div className="relative w-screen bg-slate-100 py-5">
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
