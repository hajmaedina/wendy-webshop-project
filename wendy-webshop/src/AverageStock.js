import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import db from './firebase/db';

export default function AverageStock() {
  const [links, setLinks] = useState({
    'only available': '/only-available',
    'cheapest first': '/cheapest-first',
    'contains nike': '/contains-nike',
    'average stock': '/average-stock',
    'most expensive available': '/most-expensive',
  });


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

  
   function setAvg(){
     if (!products.length) {
       return;
     }
    setAverageStockQuantity(products.map(product => product.quantityOfStock).reduce((a, b) => a + b, 0)/products.length);
   }

   useEffect(() => {
    setAvg();
   }, [products]);


  return (
    <div className="container">
      <Link to="/" className="text-decoration-none"><h1 className="text-info mt-3">My Shop</h1></Link>
      <hr className="text-info" />
      <NavBar links={links} />
      <div className="m-2 mt-5">
        <h2 className="row">Average stock:{averageStockQuantity}</h2>
      </div>
    </div>
  );
}
