import React, { useEffect, useState } from 'react';
import db from './firebase/db';

export default function AverageStock() {
  const [products, setProducts] = useState([]);
  const [averageStockQuantity, setAverageStockQuantity] = useState();

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

  function setAvg() {
    if (!products.length) {
      return;
    }
    setAverageStockQuantity(
      products
        .map((product) => product.quantityOfStock)
        .reduce((a, b) => a + b, 0) / products.length
    );
  }

  useEffect(() => {
    setAvg();
  }, [products]);

  return (
    <div className="m-2 mt-5">
      <h2 className="row">Average stock: {averageStockQuantity}</h2>
    </div>
  );
}
