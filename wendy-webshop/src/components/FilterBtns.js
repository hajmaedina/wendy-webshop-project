import { Link } from 'react-router-dom';

export default function FilterBtns() {

    return( 
        <div className="w-100 d-flex justify-content-between mt-3 mb-3">
            <button className='btn btn-orange'><Link to='/only-available'>only available</Link></button>
            <button className='btn btn-orange'><Link to='/cheapest-first'>cheapest first</Link></button>
            <button className='btn btn-orange'><Link to='/contains-nike'>contains nike</Link></button>
            <button className='btn btn-orange'><Link to='/average-stock'>average stock</Link></button>
            <button className='btn btn-orange'><Link to='/most-expensive'>most expensive available</Link></button>
        </div>
    )
}