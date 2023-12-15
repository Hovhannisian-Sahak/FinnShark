import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyProfile } from "../../api";
import { CompanyProfile } from "../../company";
import SideBar from "../../Components/SideBar/SideBar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";

type Props = {};

const CompanyPage = (props: Props) => {
  const [company, setCompany] = useState<CompanyProfile>();
  let { ticker } = useParams();
  useEffect(() => {
    const fetchCompanyPage = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data.profile);
    };
    fetchCompanyPage();
  }, []);
  return (
    <div>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <SideBar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company not found!</div>
      )}
    </div>
  );
};

export default CompanyPage;
