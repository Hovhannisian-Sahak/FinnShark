import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyProfile } from "../../api";
import { CompanyProfile } from "../../company";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";

type Props = {};

const CompanyPage = (props: Props) => {
  const [company, setCompany] = useState<CompanyProfile>();
  let { ticker } = useParams();
  useEffect(() => {
    const fetchCompanyPage = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    fetchCompanyPage();
  }, []);
  console.log(company);
  return (
    <div>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <SideBar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={"$" + company.price.toString()} />

            <Tile title="Sector" subTitle={company.sector} />
            {/* <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p> */}
            <CompFinder ticker={company?.symbol} />
            <TenKFinder ticker={company?.symbol} />
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompanyPage;
