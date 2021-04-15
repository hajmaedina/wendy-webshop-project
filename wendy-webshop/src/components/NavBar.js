import { Link } from 'react-router-dom';
import { useState } from 'react';

//example for links in props:
// const links = {
//     'only available': '/only-available',
//     'cheapest first': '/cheapest-first',
//     'contains nike': '/contains-nike',
//     'average stock': '/average-stock',
//     'most expensive available': '/most-expensive'
// }

export default function NavBar({ links }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const navLinks = [];

    for (const [text, link] of Object.entries(links)) {
        const navLink = <Link to={link} className='link-orange'>{text}</Link>

        navLinks.push(navLink);
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light mb-3">
            <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span class="navbar-toggler-icon"><i class="bi bi-list"></i></span>
            </button>

            <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbar">
                <div className="navbar-nav d-flex justify-content-between w-100">
                    {navLinks}
                </div>
            </div>
        </nav>
    )
}


//Nav toggler: 
//https://dev.to/johnotu/how-to-toggle-bootstrap-navbar-collapse-button-in-react-without-jquery-joo
//https://dev.to/danwalsh/getting-started-with-the-new-bootstrap-5-beta-and-nextjs-51am
