import React, { useState, useEffect, useReducer } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import RankingsTable from "../components/Rankings/RankingsTable";
import MetricBtn from "../components/Rankings/MetricBtn";
import DataRefToText from "../utils/DataRefToText";
import CompaniesApi from "../api/CompaniesApi";
import QueryError from "../components/QueryError";
import FilterDropdown from "../components/Rankings/FilterDropdown";
import { MyOption, TOptionsSelected } from "../types/MyOption";
import FilterCheckbox from "../components/Rankings/FilterCheckbox";
import RankingsNavBtn from "../components/Rankings/RankingsNavBtn";
import { useCalculateHeight } from "../hooks/useCalculateHeight";

const Rankings: React.FC = () => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [rankings, setRankings] = useState<ICompanyData[]>([]);
  const [metric, setMetric] = useState<string>("total_score");
  const [industryOptionsSelected, setIndustryOptionsSelected] = useState<string | null>(null);
  const [industries , setIndustries] = useState<string[] | undefined>(undefined);
  const [dropdownOptions, setDropdownOptions] = useState<MyOption[]>([]);

  const [nyse, setNyse] = useState(false);
  const [nasdaq, setNasdaq] = useState(false);
  const [uncachedRankingsLoading, setUncachedRankingsLoading] = useState(false);

  const [sliceStart, setSliceStart] = useState<number>(0);

  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    setSliceStart(0);
    const industryFilter = industryOptionsSelected ? `industry=${industryOptionsSelected}` : null;
    let exchangeFilter: string | null;
    if (nyse == nasdaq) {
      exchangeFilter = null;
    } else if (nyse) {
      exchangeFilter = "exchange=NEW YORK STOCK EXCHANGE, INC.";
    } else {
      exchangeFilter = "exchange=NASDAQ NMS - GLOBAL MARKET";
    }

    let finalFilter: string | null;
    if (industryFilter && exchangeFilter) {
      finalFilter = industryFilter + "&" + exchangeFilter;
    } else if (industryFilter) {
      finalFilter = industryFilter;
    } else if (exchangeFilter) {
      finalFilter = exchangeFilter;
    } else {
      finalFilter = null;
    }

    const fetchData = async () => {
      setUncachedRankingsLoading(true);
      const res = await CompaniesApi.fetchRankings(metric, finalFilter);
      setRankings(res);
    };

    fetchData().then(() => {
      setUncachedRankingsLoading(false);
      forceUpdate();
    });
  }, [metric, industryOptionsSelected, nyse, nasdaq]);

  const queryClient = useQueryClient();

  const { isLoading: industriesLoading, isError: industriesIsError, error: industriesError } = useQuery<string[], Error>(["industries"], CompaniesApi.getIndustries, {
    onSuccess: (res) => {
      setIndustries(res);
    }
  });

  if (industriesIsError) {
    return <QueryError message={industriesError.message} />;
  }

  /* Check if exists in cache */
  useEffect(() => {
    const cachedIndustries: string[] | undefined = queryClient.getQueryData(["industries"]);
    if (cachedIndustries) setIndustries(cachedIndustries);
  }, []);

  const { isLoading: rankingsLoading, isError: rankingsIsError, error: rankingsError } = useQuery<ICompanyData[], Error>([`${metric}_rankings`], async () => {
    return CompaniesApi.fetchRankings(metric);
  }, {
    onSuccess: (res) => {
      setRankings(res);
    }
  });

  if (rankingsIsError) {
    return <QueryError message={rankingsError.message} />;
  }

  useEffect(() => {
    setSliceStart(0);
    if ((!industryOptionsSelected || industryOptionsSelected === "") && !nyse && !nasdaq) {
      const cachedRanking: ICompanyData[] | undefined = queryClient.getQueryData([`${metric}_rankings`]);
      if (cachedRanking) {
        setRankings(cachedRanking);
      }
    }
  }, [metric]);

  useEffect(() => {
    setSliceStart(0);
    if (!industries) {
      setIndustryOptionsSelected(null);
      return;
    }

    let set = new Set<string>();
    for (let i = 0; i < industries.length; i++) {
      if (industries[i] == "N/A") continue;
      set.add(industries[i]);
    }

    let options: MyOption[] = [];
    let cnt = 1;
    set.forEach((industry, ) => {
      options.push({ value: cnt.toString(), label: industry});
      cnt++;
    });
    setDropdownOptions(options);
  }, [industries]);

  const handleIndustryOptSel = (ios?: TOptionsSelected) => {
    if (!ios) {
      setIndustryOptionsSelected(null);
    } else if (Array.isArray(ios)) {
      if (ios.length === 0) {
        setIndustryOptionsSelected(null);
        return;
      }
      let labels: string[] = [];
      for (let i = 0; i < ios.length; i++) {
        labels[i] = ios[i].label;
      }

      setIndustryOptionsSelected(labels.join(","));
    }
  };

  useEffect(() => {
    setSliceStart(0);
  }, [reverse]);

  const height = useCalculateHeight();

  useEffect(() => {
    forceUpdate();
  }, [height]);

  const FilterBtnStyles = "border-2 rounded-xl border-black p-1 my-0.5";

  return (
    <div id="#container" className={`relative flex flex-col justify-evenly bg-white py-[2.22vh] h-[${height}px] overflow-y-hidden font-modern mt-[1vh]`}>
      <div className="flex flex-row">
        <div className="font-modern rounded-lg bg-white shadow-light w-fit h-min m-2 p-2">
          <u className="text-xl">Sort By:</u>
          <MetricBtn
            text="Total Score"
            thisMetric={"total_score"}
            currMetric={metric}
            setMetric={setMetric}
            styles={FilterBtnStyles}
          />
          <MetricBtn
            text="Environmental Score"
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
        <div className="w-[63.33vw]">
          { !rankingsLoading && !uncachedRankingsLoading ? (
            <div className="flex flex-col">
              <RankingsTable rankings={rankings.slice(!reverse ? sliceStart : Math.max(rankings.length - sliceStart - 50, 0), !reverse ? sliceStart + 50 : Math.min(rankings.length - sliceStart, rankings.length))} metric={metric} start={!reverse ? sliceStart : Math.max(rankings.length - sliceStart - 50, 0)} reverse={reverse} />
              <div className="flex flex-row relative rounded-b-xl bg-white shadow-light w-min ml-auto mr-auto">
                <RankingsNavBtn handleClick={() => {
                  setSliceStart(prevState => {
                    return prevState >= 50 ? prevState - 50 : prevState;
                  });
                }} dir="left" color={sliceStart >= 50 ? "text-black" : "text-gray-200" } />
                <RankingsNavBtn handleClick={() => {
                  setSliceStart(prevState => {
                    return prevState >= rankings.length - 50 ? prevState : prevState + 50;
                  });
                }} dir="right" color={sliceStart < rankings.length - 50 ? "text-black" : "text-gray-200"} />
              </div>
            </div>
            ) :
          <RankingsLoading metric={DataRefToText[metric]} />
          }
        </div>
        <div className="flex flex-col m-2 p-3 shadow-light bg-white rounded-lg w-fit h-min">
          <u className="text-xl">Filters: </u>
          <div className="border-2 border-black p-2 my-2 rounded-lg">
            <FilterCheckbox label="Reverse rankings" value={reverse} onChange={() => setReverse(prevState => !prevState)} />
          </div>
          {!industriesLoading ?
            <div className="border-2 rounded-lg p-2 border-black w-[20vw] h-[11vh]">
              <FilterDropdown title="Industry:" options={dropdownOptions} passBack={handleIndustryOptSel}/>
            </div>
              :
            <div className="border-2 rounded-lg p-2 border-black w-[20vw] h-[11vh]">
              <p>Industry:</p>
            </div>
          }
          <div className="flex flex-col h-fit mt-2 border-2 rounded-lg p-2 border-black">
            <h3>Stock Exchange: </h3>
            <FilterCheckbox label="NYSE" value={nyse} onChange={() => setNyse(prevState => !prevState)} />
            <FilterCheckbox label="Nasdaq" value={nasdaq} onChange={() => setNasdaq(prevState => !prevState)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;