import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { ICompanyData } from "../types/ICompanyData";
import RankingsLoading from "../components/Rankings/RankingsLoading";
import Rankings from "../components/Rankings/Rankings";
import DataRefToText from "../mods/DataRefToText";
import MetricBtn from "../components/MetricBtn";

const defaultMetric = "total_score";
const FilterBtnStyles = "border-2 rounded-xl border-black p-1 my-0.5";

const Home: React.FC = () => {
  const [rankings, setRankings] = useState<ICompanyData[]>([]);
  const [rankingsLoaded, setRankingsLoaded] = useState<boolean>(false);

  const [names, setNames] = useState<string[][]>([[]]);
  const [namesLoaded, setNamesLoaded] = useState<boolean>(false);

  const [metric, setMetric] = useState<string>(defaultMetric);

  useEffect(() => {
    const getNames = async () => {
      const res = await axios.get("http://localhost:8000/companies/getNames");
      const data = res.data;

      const f: string[][] = [[]];
      f.pop();
      for (const ticker in data) {
        f.push([ticker, data[ticker]]);
      }

      setNames(f);
    };

    getNames().then(() => setNamesLoaded(true));
  }, []);

  useEffect(() => {
    const reFetchRankings = async () => {
      const res = await axios.get(`http://localhost:8000/companies/sort/${metric}`);
      setRankings(res.data);
    };

    setRankingsLoaded(false);
    reFetchRankings().then(() => setRankingsLoaded(true));
  }, [metric]);

  return (
    <div className="relative w-screen bg-white mt-5">
      { namesLoaded ? <SearchBar placeholder="Search by ticker or name..." data={names} /> : <div className="h-16 my-5" /> }
      <div className="relative">
        {rankingsLoaded ?
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
            <Rankings rankings={rankings} metric={metric} />
          </div>
            : <RankingsLoading metric={DataRefToText[metric]} /> }
      </div>
    </div>
  );
};

export default Home;
