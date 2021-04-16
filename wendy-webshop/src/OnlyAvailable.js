import { useEffect, useState } from 'react';
import Table from './components/Table';
import db from './firebase/db';

export default function OnlyAvailable({ products }) {
  //Ha nem kell db lekeres, hanem hasznalhoto a products:
  //const availableProducts = products.filter( product => product.quantityOfStock === 0 );

  //Ha kell db lekeres:

  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    db.collection('shopItems')
      .where('quantityOfStock', '==', 0)
      .get()
      .then((ref) => {
        const data = [];
        ref.docs.forEach((product) => {
          const docItem = product.data();
          docItem['docId'] = product.id;

          data.push(docItem);
        });

        setAvailableProducts(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return <Table products={availableProducts} />;
}
