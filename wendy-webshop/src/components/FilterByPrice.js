import PriceInput from './PriceInput';
import { useState } from 'react';
//import db from '../firebase/db';

export default function FilterByPrice({products, setProducts}) {

    const [price, setPrice] = useState('');

    function handleInputOnChange(e) {
      setPrice(e.target.value);
    }

    function handleFilterByPrice(e) {
      const filterFrom = e.target.dataset.filter;
      
      console.log ( filterFrom + price );

      //db call:
      // db.collection( 'shopItems' )
      //   .where('price', filterFrom, price)
      //   .get()
      //   .then(...setProducts())
      
    }

    return(
        <>
      <div className="w-100 d-flex align-items-end">
        <button
          className="btn btn-orange h-50 w-25 me-3"
          data-filter='>'
          onClick={handleFilterByPrice}
        >
          Above
        </button>
        <button
          className="btn btn-orange h-50 w-25 me-3"
          data-filter='<'
          onClick={handleFilterByPrice}
        >
          Below
        </button>
        <button
          className="btn btn-orange h-50 w-25 me-3"
          data-filter='=='
          onClick={handleFilterByPrice}
        >
          Exactly
        </button>
        <div className="search-box w-100">
          <PriceInput
            inputType='number'
            labelText="Filter by price:"
            name="price"
            placeholderText="...e.g.: 300"
            inputState={price}
            onChange={handleInputOnChange}
          />
        </div>
      </div>
    </>
    )
}