import React from 'react';
import FilterByPrice from './FilterByPrice';
import Table from './Table';

export default function MoreFilters({ products, setProducts }) {
  return (
    <>
      <FilterByPrice products={products} setProducts={setProducts} />
      <Table products={products} />
    </>
  );
}