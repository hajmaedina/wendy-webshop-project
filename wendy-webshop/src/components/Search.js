import SearchInput from './SearchInput';
import { useState } from 'react';

export default function Search({ products, setProducts }) {

    const [searchText, setSearchText] = useState('');

    function handleInputOnChange(e) {
        setSearchText(e.target.value);
    }

    function handleSearchOnClick() {
        //itt kell majd a props
        console.log('db call, search for: ' + searchText);
    }

    return (
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
        </div>
    )
}