// Landing page

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase/db';

import NavBar from './components/NavBar';
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
      <h1 className="text-info mt-3">My Shop</h1>
      <hr className="text-info" />
      <NavBar links={links} />
      <Search products={products} setProducts={setProducts} />
      <Link to="/new-product">
        <button className="btn btn-orange mt-4 w-100">Add New Product</button>
      </Link>
      <Table products={products} />
    </div>
  );
}
