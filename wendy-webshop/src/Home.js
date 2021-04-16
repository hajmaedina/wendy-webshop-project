import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase/db';

import Search from './components/Search';
import Table from './components/Table';

export default function Home() {
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
    <>
      <Search products={products} setProducts={setProducts} />
      <Link to="/new-product">
        <button className="btn btn-orange mt-4 w-100">Add New Product</button>
      </Link>
      <Table products={products} />
    </>
  );
}
