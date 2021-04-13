import { Link } from 'react-router-dom';

export default function FilterBtns() {

    return( 
        <div className="w-100 d-flex justify-content-between mt-3 mb-3">
            <Link to='/only-available'><button className='btn btn-orange'>only available</button></Link>
            <Link to='/cheapest-first'><button className='btn btn-orange'>cheapest first</button></Link>
            <Link to='/contains-nike'><button className='btn btn-orange'>contains nike</button></Link>
            <Link to='/average-stock'><button className='btn btn-orange'>average stock</button></Link>
            <Link to='/most-expensive'><button className='btn btn-orange'>most expensive available</button></Link>
        </div>
    )
}