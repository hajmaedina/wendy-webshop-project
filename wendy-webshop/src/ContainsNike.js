import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import db from './firebase/db';

import NavBar from './components/NavBar';
import Table from './components/Table';

export default function ContainsNike() {
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

  const nikeProducts = products.filter(
    (product) =>
      product.description.toLowerCase().includes('nike') ||
      product.name.toLowerCase().includes('nike')
  );

  return (
    <div className='container'>
      <Link to='/' className='text-decoration-none'>
        <h1 className='text-info mt-3'>My Shop</h1>
      </Link>
      <hr className='text-info' />
      <NavBar links={links} />
      <Table products={nikeProducts} />
    </div>
  );
}
