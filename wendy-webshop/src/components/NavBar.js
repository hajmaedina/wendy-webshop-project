import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar({ links }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const navLinks = [];

  for (const [text, link] of Object.entries(links)) {
    const navLink = (
      <Link key={text} to={link} className="link-orange">
        {text}
      </Link>
    );

    navLinks.push(navLink);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-3">
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon">
          <i className="bi bi-list"></i>
        </span>
      </button>

      <div
        className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
        id="navbar"
      >
        <div className="navbar-nav d-flex justify-content-between w-100">
          {navLinks}
        </div>
      </div>
    </nav>
  );
}
