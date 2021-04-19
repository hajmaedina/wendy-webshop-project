import React from 'react';
import { Link } from 'react-router-dom';

import Search from './components/Search';
import Table from './components/Table';

export default function Home({ products, setProducts }) {
  return (
    <>
      <Search setProducts={setProducts} />
      <Link to="/new-product">
        <button className="btn btn-orange mt-4 w-100">Add New Product</button>
      </Link>
      <Table products={products} />
    </>
  );
}
