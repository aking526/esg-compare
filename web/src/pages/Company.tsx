import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CompanyLoading from "../components/Company/CompanyLoading";
import { ICompanyData, BlankCompanyData }from "../types/ICompanyData";
import CompanyInfo from "../components/Company/CompanyInfo";
import TextDataFormat from "../components/TextDataFormat";
import ESGCategory from "../components/Company/ESGCategory";
import ESGDChart from "../components/Company/charts/ESGDChart";
import StockPriceChart from "../components/Company/charts/StockPriceChart";
import { CPair } from "../classes/CPair";
import CompanyApi from "../proxy/CompanyApi";
import QueryError from "../components/QueryError";
import StockApi from "../proxy/StockApi";
import { convertDateToUnix } from "../utils/dateUnixConverter";
import ISA from "../types/ISA";


const Company: React.FC = () => {
  const { ticker } = useParams();

  const [data, setData] = useState<ICompanyData>(BlankCompanyData);
  const [closingPrices, setClosingPrices] = useState<CPair[]>([]);
  const [from, setFrom] = useState<number>(946787386);
  const [to, setTo] = useState<number>(convertDateToUnix(new Date()));
  const [loaded, setLoaded] = useState<boolean>(false);

  const convertStockData = (data: ISA, which: string) => {
    const iter: number[] = data[which];
    let cc: CPair[] = [];
    for (let i = 0; i < iter.length; i++) {
      cc[i] = new CPair(i, iter[i]);
    }
    return cc;
  };

  const queryClient = useQueryClient();

  const { isLoading: dataLoading, isError: dataIsError, error: dataError } = useQuery<ICompanyData, Error>([`${ticker}_data`], async () => {
    return await CompanyApi.fetchCompanyData(ticker);
  },
  {
    onSuccess: (res) => {
      setData(res);
    }
  });
  const { isLoading: stockPricesLoading, isError: stockPricesIsError, error: stockPricesError } = useQuery([`${ticker}_stock_prices`], async () => {
    return await StockApi.fetchStockInfo(ticker, "1", from, to);
  },
  {
    onSuccess: (res) => {
      const conv = convertStockData(res, "c");
      setClosingPrices(conv);
    }
  });

  useEffect(() => {
    const cachedData: ICompanyData | undefined = queryClient.getQueryData([`${ticker}_data`]);
    const cachedStockData: ISA | undefined = queryClient.getQueryData([`${ticker}_stock_prices`]);
    if (cachedData) setData(cachedData);
    if (cachedStockData) {
      const conv = convertStockData(cachedStockData, "c");
      setClosingPrices(conv);
    }
  }, []);

  useEffect(() => {
    setLoaded(!dataLoading && !stockPricesLoading);
  }, [dataLoading, stockPricesLoading]);

  if (dataIsError) {
    return <QueryError message={dataError?.message} />;
  }

  // if (stockPricesIsError) {
  //   // @ts-ignore
  //   return <QueryError message={stockPricesError.message} />
  // }

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
            {!stockPricesLoading ?
              <div>
                <strong className="text-2xl mb-1.5">Stock Info</strong>
                <p className="text-xs">Last Updated: {new Date().toLocaleString()}</p>
                <div className="flex flex-row">
                  <StockPriceChart ticker={data.ticker} name={data.name} from={from} to={to} prices={closingPrices} />
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