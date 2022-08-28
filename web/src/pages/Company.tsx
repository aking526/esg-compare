import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyLoading from "../components/Company/CompanyLoading";
import { ICompanyData, BlankCompanyData }from "../types/ICompanyData";
import CompanyInfo from "../components/Company/CompanyInfo";
import TextDataFormat from "../components/TextDataFormat";
import ESGCategory from "../components/Company/ESGCategory";


interface ILoaded {
  companyData: boolean;
  stockInfo: boolean;
}

const Company: React.FC = () => {
  const { ticker } = useParams();
  const [data, setData] = useState<ICompanyData>(BlankCompanyData);
  const [stockInfo, setStockInfo] = useState<any>({});
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [stockInfoLoaded, setStockInfoLoaded] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const res = await axios.get(`http://localhost:8000/companies/get/${ticker}`);
      setData(res.data);
    };

    const fetchStockInfo = async () => {
      // const res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker?.toUpperCase()}&outputsize=full&apikey=${config.keys.av}`);
      // setStockInfo(res.data);
    };

    fetchCompanyData().then(() => setDataLoaded(true));
    fetchStockInfo().then(() => setStockInfoLoaded(true));
  }, []);

  useEffect(() => {
    setLoaded(dataLoaded && stockInfoLoaded);
  }, [dataLoaded, stockInfoLoaded]);

  return (
    <>
      {loaded ? (
        <div className="flex flex-col  my-16 font-modern mx-32 p-3 bg-slate-200 rounded-2xl">
          <CompanyInfo name={data.name} ticker={data.ticker} exchange={data.exchange} industry={data.industry} logo={data.logo} weburl={data.weburl} />
          <div className="flex flex-col justify-center items-center mt-5">
            <strong className="text-2xl mb-1.5">ESG Data</strong>
            <div className="flex flex-row mb-1.5">
              <ESGCategory category="Environment" score={data.environment_score} grade={data.environment_grade} level={data.environment_level} />
              <ESGCategory category="Social" score={data.social_score} grade={data.social_grade} level={data.social_level} />
              <ESGCategory category="Governance" score={data.governance_score} grade={data.governance_grade} level={data.governance_level} />
            </div>
            <TextDataFormat text="Total Score:" data={data.total_score} />
          </div>
          <div>

          </div>
        </div>
      ) :
        <CompanyLoading company={ticker}/>
      }
    </>
  );
};

export default Company;
