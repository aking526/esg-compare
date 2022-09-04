import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CompanyLoading from "../components/Company/CompanyLoading";
import { ICompanyData, BlankCompanyData }from "../types/ICompanyData";
import CompanyInfo from "../components/Company/CompanyInfo";
import TextDataFormat from "../components/TextDataFormat";
import ESGCategory from "../components/Company/ESGCategory";
import ESGDChart from "../components/Company/charts/ESGDChart";
import StockPriceChart from "../components/Company/charts/StockPriceChart";
import { GeneralStockConv, MDConv } from "../mods/StockDataConv";
import { CPair } from "../classes/CPair";
import CompanyApi from "../api/CompanyApi";


const Company: React.FC = () => {
  const { ticker } = useParams();

  const [data, setData] = useState<ICompanyData>(BlankCompanyData);
  const [error, setError] = useState<string | undefined>(undefined);
  const [md, setMd] = useState<any>({});
  const [stockPrices, setStockPrices] = useState<CPair[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [stockInfoLoaded, setStockInfoLoaded] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { isLoading: dataLoading } = useQuery<ICompanyData, Error>(`${ticker}_data`, async () => {
    return await CompanyApi.fetchCompanyData(ticker);
  }, {
    onSuccess: (res) => {
      setData(res);
    },
    onError: (err: any) => {
      setError(err.response?.data || err);
    }
  })

  const convertStockData = (stockData: any) => {
  };

  useEffect(() => {
    const fetchStockInfo = async () => {
      const res = await axios.get(`http://localhost:8000/stockInfo/get/${ticker}`);
      if (("Note" in res.data)) {
        console.log(res.data);
        return;
      }
      setMd(res.data[GeneralStockConv["md"]]);
      setStockPrices(res.data[GeneralStockConv["daily"]]);
    };

    // fetchCompanyData().then(() => setDataLoaded(true));
    fetchStockInfo().then(() => setStockInfoLoaded(true));
  }, []);

  useEffect(() => {
    setLoaded(!dataLoading && stockInfoLoaded);
  }, [dataLoading, stockInfoLoaded]);

  return (
    <>
      {loaded ? (
        <div className="flex flex-col  my-16 font-modern mx-32 p-5 bg-slate-200 rounded-2xl">
          <CompanyInfo name={data.name} ticker={data.ticker} exchange={data.exchange} industry={data.industry} logo={data.logo} weburl={data.weburl} />
          <div className="flex flex-col mt-5">
            <strong className="text-3xl mb-1.5">ESG Data</strong>
            <div className="flex flex-row mb-1.5">
              <ESGCategory category="Environment" score={data.environment_score} grade={data.environment_grade} level={data.environment_level} />
              <ESGCategory category="Social" score={data.social_score} grade={data.social_grade} level={data.social_level} />
              <ESGCategory category="Governance" score={data.governance_score} grade={data.governance_grade} level={data.governance_level} />
              <ESGDChart env={data.environment_score} soc={data.social_score} gov={data.governance_score} />
            </div>
            <TextDataFormat text="Total Score:" data={data.total_score} />
          </div>
          <div className="flex flex-col items-center mt-5">
            {stockPrices !== undefined && md !== undefined ?
              <div>
                <strong className="text-2xl mb-1.5">Stock Info</strong>
                <p className="text-xs">Last Updated: {md[MDConv["lastRefreshed"]]}</p>
                <div className="flex flex-row">
                  <StockPriceChart ticker={data.ticker} name={data.name} prices={stockPrices} />
                </div>
              </div>
            : null
            }
          </div>
        </div>
        ) :
          <CompanyLoading company={ticker}/>
      }
      </>
  );
};

export default Company;