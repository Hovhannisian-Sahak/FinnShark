import React, { SyntheticEvent } from "react";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";
import { CompanySearch } from "../../company";
interface Props {
  searchResult: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}
console.log(uuidv4());
const CardList: React.FC<Props> = ({
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <>
      {searchResult.length > 0 ? (
        searchResult.map((res) => {
          return (
            <Card
              id={res.symbol}
              key={uuidv4()}
              searchResult={res}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <h1>No Results</h1>
      )}
    </>
  );
};

export default CardList;
