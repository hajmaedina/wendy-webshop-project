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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('shopItems').onSnapshot((snapshot) => {
      const data = [];

      snapshot.docs.forEach((product) => {
        const docItem = product.data();
        docItem['docId'] = product.id;

        data.push(docItem);
      });
      setProducts(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <h1>My Shop</h1>
      <FilterBtns links={links} />
      <Search products={products} setProducts={setProducts} />
      <Table products={products} />
      <Link to="/new-product">
        <button className="btn btn-orange">New Product</button>
      </Link>
    </div>
  );
}
