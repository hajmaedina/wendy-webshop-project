import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBtns from './components/FilterBtns';
import db from './firebase/db';

export default function MostExpensive() {
  const [links, setLinks] = useState({
    'only available': '/only-available',
    'cheapest first': '/cheapest-first',
    'contains nike': '/contains-nike',
    'average stock': '/average-stock',
    'most expensive available': '/most-expensive',
  });


  const [products, setProducts] = useState([]);
  const [mostExpensiveP, setMostExpensiveP] = useState();

  // useEffect(() => {
  //   const unsubscribe = db.collection('shopItems').onSnapshot((snapshot) => {
  //     const data = [];

  //     snapshot.docs.forEach((product) => {
  //       const docItem = product.data();
  //       docItem['docId'] = product.id;

  //       data.push(docItem);
  //     });
  //     setProducts(data);
  //   });
  //   mostExpensive()
  //   return () => {
  //     unsubscribe();
  //   };
    
  // }, [products]);

  function mostExpensive() {
    const mostExpensiveProduct = Math.max(...products.map(product => product.price));
    products.map(product => {
      if(product.price === mostExpensiveProduct && product.quantityOfStock > 0){
        setMostExpensiveP(product.name);
      }
    })
  }
  
  return(
    <div className="container">
      <Link to="/" className="text-decoration-none"><h1 className="text-info mt-3">My Shop</h1></Link>
      <hr className="text-info" />
      <FilterBtns links={links} />
      <div className="m-2 mt-5">
      <h2 className="row">Most expensive available: 
      <p className="text-info col">{mostExpensiveP}</p></h2>
      </div>
      </div>
    );
}
