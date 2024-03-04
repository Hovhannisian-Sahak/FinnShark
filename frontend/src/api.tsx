import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from "./company";
import axios from "axios";
interface SearchResponse {
  data: CompanySearch;
}
export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=7&exchange=NASDAQ&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message", error.message);
      return error.message;
    } else {
      console.log("unexpected error:", error);
      return "An unexpected error happened";
    }
  }
};
export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/company/profile/${query}?apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    console.log(process.env.VITE_REACT_APP_API_KEY);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getKeyMetrics = async (query: string) => {
  try {
    const data = axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getIncomeStatements = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getCashFlow = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.VITE_REACT_APP_API_KEY}`
    );
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
