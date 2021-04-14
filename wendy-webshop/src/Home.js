// Landing page

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase/db';

import FilterBtns from './components/FilterBtns';
import Search from './components/Search';
import Table from './components/Table';

export default function Home() {
  const [links, setLinks] = useState({
    'only available': '/only-available',
    'cheapest first': '/cheapest-first',
    'contains nike': '/contains-nike',
    'average stock': '/average-stock',
    'most expensive available': '/most-expensive',
  });

  return (
    <div className="container">
      <h1>My Shop</h1>
      <FilterBtns links={links} />
      <Search />
      <Table />
      <Link to="/new-product">
        <button className="btn btn-orange">New Product</button>
      </Link>
    </div>
  );
}
