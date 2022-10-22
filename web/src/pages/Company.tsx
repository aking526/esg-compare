import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIndustryAvg } from "../hooks/useIndustryAvg";
import CompanyLoading from "../components/Company/CompanyLoading";
import { ICompanyData, BlankCompanyData } from "../types/ICompanyData";
import CompanyInfo from "../components/Company/CompanyInfo";
import ESGCategory from "../components/Company/ESGCategory";
import ESGDChart from "../components/Company/charts/ESGDChart";
import StockPriceChart from "../components/Company/charts/StockPriceChart";
import NewsSection from "../components/Company/NewsSection";
import { CPair } from "../classes/CPair";
import CompaniesApi from "../api/CompaniesApi";
import QueryError from "../components/QueryError";
import StockApi from "../api/StockApi";
import {convertDateToUnix, convertUnixToDate} from "../utils/date";
import { formatDate, getLastWeeksDate } from "../utils/date";
import { convertStockData } from "../classes/CPair";
import { TNewsInfo, IBasicFinancials, IStockQuote } from "../types/StockFinancialInterfaces";
import ISA from "../types/ISA";
import { possibleGrades, possibleLevels } from "../types/ESGDataInterfaces";


/*
Fix the formatting for the stock quote section
 */

const Company: React.FC = () => {
  const { ticker } = useParams();

  const [data, setData] = useState<ICompanyData>(BlankCompanyData);
  const [closingPrices, setClosingPrices] = useState<CPair[]>([]);

  let d = new Date();
  d.setMonth(d.getMonth() - 1)
  let newd = new Date();
  const [from, setFrom] = useState<number>(convertDateToUnix(d));
  const [to, setTo] = useState<number>(convertDateToUnix(newd));

  const [news, setNews] = useState<TNewsInfo[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);


  const [quote, setQuote] = useState<IStockQuote>({
    c: -1,
    d: -1,
    dp: -1,
    h: -1,
    l: -1,
    o: -1,
    pc: -1,
    t: -1
  });
  const [quoteLoading, setQuoteLoading] = useState(false);

  useEffect(() => {
    if (!ticker) return;

    const fetch = async () => {
      setQuoteLoading(true);
      const res = await StockApi.getQuote(ticker);
      setQuote(res);
    };

    fetch().then(() => setQuoteLoading(false));
  }, []);

  const [basicFinancials, setBasicFinancials] = useState<IBasicFinancials>({
    metric: {},
    metricType: "",
    series: {}
  });

  const queryClient = useQueryClient();

  const { isLoading: dataLoading, isError: dataIsError, error: dataError } = useQuery([`${ticker}_data`], async () => {
    const cachedData: ICompanyData | undefined = queryClient.getQueryData([`${ticker}_data`]);
    if (cachedData) {
      setData(cachedData);
      return;
    }

    return await CompaniesApi.fetchCompanyData(ticker);
  },
  {
    onSuccess: (res) => {
      if (!res) return;
      setData(res[0]);
    }
  });

  const { isLoading: stockPricesLoading, isError: stockPricesIsError, error: stockPricesError } = useQuery([`${ticker}_stock_prices`], async () => {
    const cachedStockData: ISA | undefined = queryClient.getQueryData([`${ticker}_stock_prices`]);
    if (cachedStockData) {
      const conv = convertStockData(cachedStockData, "c");
      setClosingPrices(conv);
      return;
    }

    return await StockApi.fetchStockInfo(ticker, "D", from, to);
  },
  {
    onSuccess: (res) => {
      if (!res) return;
      const conv = convertStockData(res, "c");
      setClosingPrices(conv);
    }
  });

  const { isLoading: newsLoading, isError: newsIsError, error: newsError } = useQuery([`${ticker}_news`], async () => {
    const now = new Date();
    const lastWeek = getLastWeeksDate(now);
    return await StockApi.getNews(ticker, formatDate(lastWeek) , formatDate(now));
  },
  {
    onSuccess: (res) => {
      setNews(res);
    }
  });

  const { isLoading: basicFinancialsLoading, isError: basicFinancialsIsError, error: basicFinancialsError } = useQuery([`${ticker}_basic_financials`], async () => {
    if (!ticker) return;

    const cachedBasicFinancials: IBasicFinancials | undefined = queryClient.getQueryData([`${ticker}_basic_financials`]);
    if (cachedBasicFinancials) {
      setBasicFinancials(cachedBasicFinancials);
      return;
    }

    return await StockApi.getBasicFinancials(ticker);
  }, {
    onSuccess: (res) => {
      if (!res) return;
      setBasicFinancials(res);
    }
  });

  if (basicFinancialsIsError) {
    // @ts-ignore
    return <QueryError message={basicFinancialsError?.message} />
  }

  if (dataIsError) {
    // @ts-ignore
    return <QueryError message={dataError?.message} />;
  }

  if (stockPricesIsError) {
    // @ts-ignore
    return <QueryError message={stockPricesError?.message} />;
  }

  if (newsIsError) {
    // @ts-ignore
    return <QueryError message={newsError?.message} />;
  }


  const { avgScores, avgGrades, avgLevels } = useIndustryAvg(data.industry);

  useEffect(() => {
    setLoaded(!dataLoading && !stockPricesLoading && !basicFinancialsLoading && !quoteLoading && !newsLoading);
  }, [dataLoading, stockPricesLoading, basicFinancialsLoading, quoteLoading, newsLoading]);

  return (
    <>
      {loaded && avgScores && avgGrades && avgLevels && data ? (
        <div className="flex flex-col shadow-light my-16 font-modern mx-24 p-5 bg-slate-200 rounded-2xl">
          <CompanyInfo name={data.name} ticker={data.ticker} exchange={data.exchange} industry={data.industry} logo={data.logo} weburl={data.weburl} />
          <div className="flex flex-col mt-5">
            <strong className="text-3xl mb-1.5">ESG Data</strong>
            <div className="flex flex-row mb-1.5">
              <ESGCategory
                name={data.name}
                industry={data.industry}
                category="Environment"
                score={data.environment_score}
                grade={data.environment_grade}
                level={data.environment_level}
                avg_score={avgScores.environment_score}
                avg_grade={avgGrades.environment_grade}
                avg_level={avgLevels.environment_level}
              />
              <ESGCategory
                name={data.name}
                industry={data.industry}
                category="Social"
                score={data.social_score}
                grade={data.social_grade}
                level={data.social_level}
                avg_score={avgScores.social_score}
                avg_grade={avgGrades.social_grade}
                avg_level={avgLevels.social_level}
              />
              <ESGCategory
                name={data.name}
                industry={data.industry}
                category="Governance"
                score={data.governance_score}
                grade={data.governance_grade}
                level={data.governance_level}
                avg_score={avgScores.governance_score}
                avg_grade={avgGrades.governance_grade}
                avg_level={avgLevels.governance_level}
              />
              <ESGDChart env={data.environment_score} soc={data.social_score} gov={data.governance_score}/>
            </div>
            <div className="flex flex-row">
              <p className="mx-1"><strong>Total Score:</strong> <span className={data.total_score >= avgScores.total_score ? "text-green-500" : "text-red-500"}  data-tip data-for="score-tip-total">{data.total_score}</span></p>
              <p className="mx-1"><strong>Total Grade:</strong> <span className={possibleGrades.indexOf(data.total_grade) > possibleGrades.indexOf(avgGrades.total_grade) ? "text-green-500" : data.total_grade === avgGrades.total_grade ? "text-gray-500" : "text-red-500"} data-tip data-for="grade-tip-total">{data.total_grade}</span></p>
              <p className="mx-1"><strong>Total Level:</strong> <span className={possibleLevels.indexOf(data.total_level) > possibleLevels.indexOf(avgLevels.total_level) ? "text-green-500" : data.total_level === avgLevels.total_level ? "text-gray-500" : "text-red-500"} data-tip data-for="level-tip-total">{data.total_level}</span></p>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col items-center mr-1">
              <strong className="text-2xl mb-1.5">Stock Info</strong>
              <p className="text-xs">Last Updated: {new Date().toLocaleString()}</p>
              <div className="flex flex-row">
                <StockPriceChart ticker={data.ticker} name={data.name} from={from} to={to} prices={closingPrices} />
              </div>
            </div>
            <div className="flex flex-col justify-evenly ml-2 items-center px-2 pb-2">
              <div>
                <strong className="text-2xl mb-1.5">Stock Quote</strong>
                <div><strong>Current Price: </strong> {quote.c}</div>
                <div><strong>Change: </strong> {quote.d}</div>
                <div><strong>Percent Change: </strong> {quote.dp}</div>
                <div>
                  <h3>Today's prices</h3>
                  <div><strong>High price of the day: </strong> {quote.h}</div>
                  <div><strong>Low price of the day: </strong> {quote.l}</div>
                  <div><strong>Opening price of the day: </strong> {quote.o}</div>
                </div>
                <div><strong>Previous close price: </strong> {quote.pc}</div>
              </div>
              <div>
                <strong className="text-2xl mb-1.5">Basic Financials</strong>
                <div className="my-1">
                  <div><strong>Market Cap: </strong> {basicFinancials.metric["marketCapitalization"]} million</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <strong className="text-2xl mb-1.5">News</strong>
            <div className="flex flex-row">
              {news.slice(0, 5).map((curr, idx) => {
                if (!curr.url || curr.url === "") return null;
                return <NewsSection currNews={curr} key={idx} />;
              })}
            </div>
          </div>
        </div>
        ) :
          <CompanyLoading company={ticker}/>
      }
    </>
  );
};

export default Company;