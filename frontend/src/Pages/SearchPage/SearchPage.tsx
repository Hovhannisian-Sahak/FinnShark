import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortFolioValues] = useState<PortfolioGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  useEffect(() => {
    getPortfolio();
  }, []);
  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortFolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values");
      });
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await searchCompanies(search);
    if (typeof res === "string") {
      setServerError(res);
    } else if (Array.isArray(res.data)) {
      setSearchResult(res.data);
    }
    console.log(searchResult);
  };
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not create portfolio");
      });
  };
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status === 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    });
  };
  return (
    <>
      <div>
        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelete}
        />
        <CardList
          searchResult={searchResult}
          onPortfolioCreate={onPortfolioCreate}
        />
      </div>
    </>
  );
};

export default SearchPage;
