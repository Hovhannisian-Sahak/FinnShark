import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyProfile } from "../../api";
import { CompanyProfile } from "../../company";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";

import TenKFinder from "../../Components/TenKFinder/TenKFinder";

type Props = {};

const CompanyPage = (props: Props) => {
  const [company, setCompany] = useState<CompanyProfile>();
  let { ticker } = useParams();
  console.log(ticker);
  useEffect(() => {
    const fetchCompanyPage = async () => {
      const result = await getCompanyProfile(ticker!);
      console.log(result);
      setCompany(result?.data);
    };
    fetchCompanyPage();
  }, []);
  console.log(company?.symbol);
  return (
    <div>
      {company ? ( // Check if company array has elements
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <SideBar />
          <CompanyDashboard ticker={ticker!}>
            <Tile
              title="Company Name"
              subTitle={company?.profile?.companyName}
            />
            <Tile title="Price" subTitle={"$" + company?.profile?.price} />
            <Tile title="Sector" subTitle={company?.profile?.sector} />

            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company?.profile?.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompanyPage;
