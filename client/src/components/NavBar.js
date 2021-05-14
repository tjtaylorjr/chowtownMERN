import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  const { user, logout } = props;
  return (
    <nav className="navbar">
      <a href="/restaurants" className="navbar__site-name">
        ChowTown
        </a>
      <div className="navbar__links">
        <li className="navbar__item">
          <NavLink to={"/restaurants"} className="navbar__nav-link">
            Restaurants
            </NavLink>
        </li>
        <li className="navbar__item">
          {user ? (
            <a onClick={logout} className="navbar__nav-link" style={{ cursor: 'pointer' }}>
              Logout {user.name}
            </a>
          ) : (
            <NavLink to={'/login'} className="navbar__nav-link">
              Login
            </NavLink>
          )}
        </li>
        {!user && (
          <li className="navebar__item">
            <NavLink to={'/signup'} className="navbar__nav-link">
              Signup
              </NavLink>
          </li>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
