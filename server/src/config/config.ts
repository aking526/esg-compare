import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lcngxly.mongodb.net/company_info?`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVER_AUTH = process.env.SERVER_AUTH || "";
const SERVER_KEY = process.env.SERVER_KEY || "";

const ESG_API_KEY = process.env.ESG_API_KEY || "";
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || "";
const AV_API_KEY = process.env.AV_API_KEY || "";

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT,
    auth: SERVER_AUTH,
    key: SERVER_KEY
  },
  keys: {
    esg: ESG_API_KEY,
    finnhub: FINNHUB_API_KEY,
    av: AV_API_KEY
  }
};
