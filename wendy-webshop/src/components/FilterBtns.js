import { Link } from 'react-router-dom';

//example for links in props:
// const links = {
//     'only available': '/only-available',
//     'cheapest first': '/cheapest-first',
//     'contains nike': '/contains-nike',
//     'average stock': '/average-stock',
//     'most expensive available': '/most-expensive'
// }

export default function FilterBtns({links}) {

    const buttons = [];

    for ( const [text, link] of Object.entries(links) ) {
        const button = <Link to={link}><button className='btn btn-orange'>{text}</button></Link>
        buttons.push( button );
    }

    return (
        <div className="w-100 d-flex justify-content-between mt-3 mb-3">
            {buttons}
        </div>
    )
}