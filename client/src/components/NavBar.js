import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import AuthForm from './AuthForm';
import logo from '../assets/textless-logo.png';
import brandName from '../assets/brand.png';

const NavBar = (props) => {

  const { user, logout, mockLogin, login } = props;

  let navLinks;

  if(user) {
    navLinks = (
      <div>
        <ProfileButton user={user} logout={logout}/>
      </div>
    );
  } else {
    navLinks = (
      <div className="navbar__buttons">
        <div className="navbar__login-button">
          <AuthForm action={"Login"} mockLogin={mockLogin} login={login}/>
        </div>
        <div className="navbar__signup-button">
          <AuthForm action={"Signup"}/>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar__site-brand">
        <NavLink exact to="/" className="navbar__site-brand-link">
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
        <li className="navbar__item">
          <NavLink to={"/restaurants"} className="navbar__nav-link">
            Search
          </NavLink>
        </li>
        {navLinks}
      </div>
    </nav>
  );
};

export default NavBar;
