import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restore } from '../store/actions/auth';
import ProfileButton from './ProfileButton';
import AuthForm from './AuthForm';
import logo from '../assets/textless-logo.png';
import brandName from '../assets/brand.png';

const NavBar = (props) => {
  const[isLoaded, setIsLoaded] = useState(false);
  // const[isLoggedIn, setIsLoggedIn] = useState(false);
  //const[modalState, setModalState] = useState({type: "Login"})
  const { setUser, isLoggedIn, setIsLoggedIn } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  let jwt = JSON.parse(localStorage.getItem('profile'));
  let navLinks;

  useEffect(() => {
    if (jwt) {
      dispatch(restore(jwt, history))
      setUser(jwt.result);
      // setIsLoggedIn(true);
    } else {
      // setIsLoggedIn(false);
    }
  },[isLoggedIn]);

  if (isLoggedIn) {

    navLinks = (
      <div>
        <ProfileButton  user={user} setIsLoggedIn={setIsLoggedIn} setIsLoaded={setIsLoaded}/>
      </div>
    );
  } else {
    navLinks = (
      <div className="navbar__auth-container">
        <div className="navbar__login">
          <AuthForm action={"Login"} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <div className="navbar__signup">
          <AuthForm action={"Signup"} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    );
  };


  return (
    <nav className="navbar">
      <div className="navbar__site-brand" onClick={() => history.push('/')}>
        <div className="navbar__site-brank-link">
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
        </div>
      </div>
      <div className="navbar__links">
        {/* <li className="navbar__item">
          <NavLink to={"/restaurants"} className="navbar__nav-link">
            Search
          </NavLink>
        </li> */}
        {navLinks}
      </div>
    </nav>
  );
};

export default NavBar;
