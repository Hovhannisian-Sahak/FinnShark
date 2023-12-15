import { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../company";
import Table from "../Table/Table";
import { useOutletContext } from "react-router-dom";
import { getIncomeStatements } from "../../api";
export type Props = {};
export const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      company.depreciationAndAmortization,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => company.eps,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => company.epsdiluted,
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
  },
];
const IncomeStatement = (props: Props) => {
  const [incomeStatements, setIncomeStatements] =
    useState<CompanyIncomeStatement[]>();
  const ticker = useOutletContext<string>();
  console.log(ticker);
  useEffect(() => {
    const getRatios = async () => {
      const res = await getIncomeStatements(ticker);
      console.log(res);
      setIncomeStatements(res!.data);
    };
    getRatios();
  }, []);
  console.log(incomeStatements);
  return (
    <>
      {incomeStatements ? (
        <>
          <Table config={configs} data={incomeStatements} />
        </>
      ) : (
        <>...loading</>
      )}
    </>
  );
};
export default IncomeStatement;
