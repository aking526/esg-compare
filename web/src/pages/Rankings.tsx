import React, { useState, useEffect, useReducer } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import RankingsTable from "../components/Rankings/RankingsTable";
import MetricBtn from "../components/Rankings/MetricBtn";
import DataRefToText from "../mods/DataRefToText";
import CompaniesApi from "../api/CompaniesApi";
import QueryError from "../components/QueryError";
import FilterDropdown from "../components/Rankings/FilterDropdown";
import { MyOption, TOptionsSelected } from "../types/MyOption";
import FilterCheckbox from "../components/Rankings/FilterCheckbox";
import RankingsNavBtn from "../components/Rankings/RankingsNavBtn";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Rankings: React.FC = () => {
  const defaultMetric = "total_score";
  const FilterBtnStyles = "border-2 rounded-xl border-black p-1 my-0.5";

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const [rankings, setRankings] = useState<ICompanyData[]>([]);
  const [metric, setMetric] = useState<string>(defaultMetric);
  const [filters, setFilters] = useState<string | null>(null);
  const [queryKey, setQueryKey] = useState<string>(`${metric}_rankings`);
  const [industryOptionsSelected, setIndustryOptionsSelected] = useState<string | null>(null);
  const [industries , setIndustries] = useState<string[] | undefined>(undefined);
  const [dropdownOptions, setDropdownOptions] = useState<MyOption[]>([]);

  const [nyse, setNyse] = useState(false);
  const [nasdaq, setNasdaq] = useState(false);
  const [uncachedRankingsLoading, setUncachedRankingsLoading] = useState(false);

  const [sliceStart, setSliceStart] = useState<number>(0);

  useEffect(() => {
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
  }, [industryOptionsSelected, nyse, nasdaq]);

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

  const { isLoading: rankingsLoading, isError: rankingsIsError, error: rankingsError } = useQuery<ICompanyData[], Error>([queryKey], async () => {
    return CompaniesApi.fetchRankings(metric, filters);
  }, {
    onSuccess: (res) => {
      setRankings(res);
    }
  });

  if (rankingsIsError) {
    return <QueryError message={rankingsError.message} />
  }

  // useEffect(() => {
  //   if (filters) {
  //     setQueryKey(`${metric}_score_with_filters`)
  //   }
  // }, [filters]);

  useEffect(() => {
    if (filters) {
      setQueryKey(`${metric}_rankings_with_filters`);
    } else {
      setQueryKey(`${metric}_rankings`);
      const cachedRanking: ICompanyData[] | undefined = queryClient.getQueryData([`${metric}_rankings`]);
      if (cachedRanking) setRankings(cachedRanking);
    }
  }, [metric]);

  useEffect(() => {
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

  return (
      <div className={`relative w-screen bg-slate-100 py-5 h-page-h overflow-y-hidden`}>
        {/*{ !rankingsLoading && !uncachedRankingsLoading ?*/}
          <div className="flex flex-row">
            <div className="font-modern border-2 rounded-lg w-fit h-min m-2 p-2">
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
            <div className="w-rankings-w">
              { !rankingsLoading && !uncachedRankingsLoading ? (
                <div className="flex flex-col">
                  <RankingsTable rankings={rankings.slice(sliceStart, sliceStart + 50)} metric={metric} start={sliceStart} />
                  <div className="flex flex-row w-rankings-w justify-center">
                    <RankingsNavBtn handleClick={() => {
                      setSliceStart(prevState => {
                        return prevState === 0 ? 0 : prevState - 50;
                      });
                    }} icon={faArrowLeft} />
                    <RankingsNavBtn handleClick={() => {
                      setSliceStart(prevState => {
                        return prevState >= rankings.length - 50 ? prevState : prevState + 50;
                      });
                    }} icon={faArrowRight} />
                  </div>
                </div>
                ) :
              <RankingsLoading metric={DataRefToText[metric]} />
              }
            </div>
            <div className="flex flex-col m-2 p-2 border-2 rounded-lg w-96 h-min">
              {!industriesLoading &&
                <>
                  <u className="text-xl">Filters: </u>
                  <FilterDropdown title="Industry:" options={dropdownOptions} passBack={handleIndustryOptSel}/>
                </>
              }
              <div className="mt-1">
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