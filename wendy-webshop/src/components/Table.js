import TableItem from './TableItem';
import {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'bootstrap';
import DeleteItem from './DeleteItem';

import db from '../firebase/db';

function Table({ products }) {

  const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
  	
  const deleteModalRef = useRef();

  function handleDeleteConfirm() {
      db.collection('shopItems').doc(itemToBeDeleted).delete();
  
      const myModal = new Modal(deleteModalRef.current);
      myModal.show();
      myModal.hide();
    }
  
    function handleDeleteOnClick(ev) {
      let toBeDeleted = ev.target.dataset.id;
  
      setItemToBeDeleted(toBeDeleted);
    }

  console.log('products:', products);
  return (
    <>
      <header className={'container mt-4 mb-4'}></header>
      <main className={'container-md'}>
        <section>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity of stock</th>
                <th>Modify</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.docId}>
                  <TableItem
                    key={product.docId}
                    name={product.name}
                    type={product.type}
                    description={product.description}
                    price={product.price}
                    quantityOfStock={product.quantityOfStock}
                  />
                  <td>
                    <Link to={`/product/edit/${product.docId}`}>
                      <button className="btn btn-info me-3">Modify</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-orange me-3"
                      data-id={product.docId}
                      data-bs-target="#myModal"
                      data-bs-toggle="modal"
                      onClick={handleDeleteOnClick}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteItem
              handleDeleteConfirm={handleDeleteConfirm}
              deleteModalRef={deleteModalRef}
          />
        </section>
      </main>
    </>
  );
}

export default Table;
