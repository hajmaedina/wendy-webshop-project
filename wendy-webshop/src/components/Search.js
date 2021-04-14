import SearchInput from './SearchInput';
import { useState } from 'react';
import db from '../firebase/db';

export default function Search({ setProducts }) {

    const [searchText, setSearchText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    function handleInputOnChange(e) {
        setSearchText(e.target.value);
    }

    function handleSearchOnClick() {
        if (searchText.trim('').length > 0) {
            db.collection('shopItems')
                .where('name', '>=', searchText)
                .where('name', '<=', searchText + '\uf8ff')
                .get()
                .then(ref => {
                    const data = [];

                    ref.docs.forEach((product) => {
                        const docItem = product.data();
                        docItem['docId'] = product.id;

                        data.push(docItem);
                    });
                    if (data.length > 0) {
                        setProducts(data);
                        setShowAlert(false);
                    } else {
                        setShowAlert(true);
                    }
                })
                .catch( error => {
                    console.error( error.message )
                });
        }
    }

    function handleGetAllOnClick() {
        setShowAlert( false );
        setSearchText( '' );
        db.collection('shopItems')
            .get()
            .then(ref => {
                const data = [];

                ref.docs.forEach((product) => {
                    const docItem = product.data();
                    docItem['docId'] = product.id;

                    data.push(docItem);
                });

                setProducts( data );
            })
            .catch( error => {
                console.error( error.message )
            });
    }

    return (
        <>
            <div className='w-100 d-flex align-items-end'>

                <div className="search-box w-100">
                    <SearchInput
                        labelText='Search for:'
                        name='search'
                        placeholderText='...something like nike'
                        inputState={searchText}
                        onChange={handleInputOnChange}
                    />
                </div>

                <button className='btn btn-orange h-50 ms-3' onClick={handleSearchOnClick}>Search</button>
                <button className='btn btn-orange h-50 ms-3' onClick={handleGetAllOnClick}>All</button>
            </div>
            { showAlert &&
                <div className='alert alert-danger mt-3 mb-3' role="alert">
                    Sorry, we didn't find anything.
            </div>
            }
        </>
    )
}