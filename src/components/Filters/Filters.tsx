import { useSearchParams } from 'react-router-dom';
import './Filters.scss';
import { useState } from 'react';

type Props = {
  changeQuery: (value: string) => void;
  changeOrder: (value: string) => void;
}

export const Filters: React.FC<Props> = ({ changeQuery, changeOrder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const order = searchParams.get("order") || "";

  const getParams = (order: string) => {
    const params: any = {};

    if (!!query) {
      params.query = query;
    }

    if (!!order) {
      params.order = order;
    } 
    return params;
  }

  const sortItems = (order: string) => {
    setSearchParams(getParams(order));
    changeOrder(order);
  }

  const resetFilters = () => {
    setSearchParams({});
    changeOrder('');
    changeQuery('');
  }

  return (
    <div className="filter-block">
      {order === 'ASC' && (
        <i className="fas fa-arrow-up mr10 asc"></i>
      )}
      {order === 'DESC' && (
        <i className="fas fa-arrow-down mr10 desc"></i>
      )}
      {!order && (
        <i className="fas fa-arrows-alt-v mr10 alt-v"></i>
      )}

      <button className="btn btn-primary mr10" onClick={() => sortItems('ASC')}>
        Sort <i className="fas fa-arrow-up"></i>
      </button>

      <button className="btn btn-success mr10" onClick={() => sortItems('DESC')}>
        Sort <i className="fas fa-arrow-down"></i>
      </button>

      <button className="btn btn-danger" onClick={resetFilters}>Reset filters</button>
    </div>
  );
}
