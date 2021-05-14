import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginForm from './LoginForm';
import logo from '../assets/textless-logo.png';
import brandName from '../assets/brand.png';

const NavBar = (props) => {

  const { user, logout } = props;

  let navLinks;

  if(user) {
    navLinks = (
      <div>
        <ProfileButton.js user={user} />
      </div>
    );
  } else {
    navLinks = (
      <div className="navbar__buttons">
        <LoginForm />
        <div>
          <NavLink className="navbar__register-button" to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar__site-brand">
        <NavLink exact to="/restaurants" className="navbar__site-brand-link">
          <img
            className="navbar__site-brand-logo"
            src={logo}
            alt="logo"
          />
          <img
            className="navbar__site-brand-name"
            src={brandName}
            alt="ChowTown"
          />
        </NavLink>
      </div>
      <div className="navbar__links">
        {/* {isLoaded && navLinks} */}
        <li className="navbar__item">
          <NavLink to={"/restaurants"} className="navbar__nav-link">
            Search
          </NavLink>
        </li>
        <li className="navbar__item">
          {user ? (
            <a
              onClick={logout}
              className="navbar__nav-link"
              style={{ cursor: 'pointer' }}
            >
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
