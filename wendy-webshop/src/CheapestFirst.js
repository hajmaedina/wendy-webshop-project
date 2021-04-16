import React, { useState, useEffect } from 'react';
import db from './firebase/db';

import Table from './components/Table';

export default function CheapestFirst() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('shopItems')
      .orderBy('price', 'asc')
      .onSnapshot((snapshot) => {
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

  return <Table products={products} />;
}
