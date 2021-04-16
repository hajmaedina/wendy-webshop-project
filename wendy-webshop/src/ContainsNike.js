import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import db from './firebase/db';

import Table from './components/Table';

export default function ContainsNike() {
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

  const nikeProducts = products.filter(
    (product) =>
      product.description.toLowerCase().includes('nike') ||
      product.name.toLowerCase().includes('nike')
  );

  return <Table products={nikeProducts} />;
}
