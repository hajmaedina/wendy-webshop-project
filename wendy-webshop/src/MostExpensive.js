import React, { useEffect, useState } from 'react';

import db from './firebase/db';

export default function MostExpensive() {
  const [products, setProducts] = useState([]);
  const [mostExpensiveP, setMostExpensiveP] = useState();

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

  useEffect(() => {
    mostExpensive();
  }, [products]);

  function mostExpensive() {
    const mostExpensiveProduct = [];
    products.map((product) => {
      mostExpensiveProduct.push(product.price);

      if (
        product.price === Math.max(...mostExpensiveProduct) &&
        product.quantityOfStock > 0
      ) {
        setMostExpensiveP(product.name);
      }
    });
  }

  return (
    <div className="m-2 mt-5">
      <h2 className="row">
        Most expensive available:
        <p className="text-info col">{mostExpensiveP}</p>
      </h2>
    </div>
  );
}
