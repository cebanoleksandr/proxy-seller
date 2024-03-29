import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import './Search.scss';

type Props = {
  searchQuery: string;
  changeQuery: (value: string) => void;
  placeholder: string;
}

export const Search: React.FC<Props> = ({ searchQuery, changeQuery, placeholder }) => {
  const [search, setSearch] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get("order") || "";

  const searchHandler = () => {
    const params: any = {};

    if (!!search) {
      params.query = search;
    }

    if (!!order) {
      params.order = order;
    }

    setSearchParams(params);
    changeQuery(search);
  }

  return (
    <div className="search mb20 mr20">
      <input
        type="text"
        className="mr10"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
      />

      <button className="btn btn-success search-btn" onClick={searchHandler}>
        <i className="fas fa-search mr10"></i>
        Search
      </button>
    </div>
  );
}
