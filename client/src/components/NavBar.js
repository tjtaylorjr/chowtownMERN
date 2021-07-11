import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import AuthForm from './AuthForm';
import logo from '../assets/textless-logo.png';
import brandName from '../assets/brand.png';

const NavBar = (props) => {
  // const[profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const[profile, setProfile] = useState();
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  //const[loaded, setLoaded] = useState(false);
  const { setUser, logout } = props;
  const history = useHistory();

  //setProfile(JSON.parse(localStorage.getItem('profile')));

  let navLinks;
  //const profile = JSON.parse(localStorage.getItem('profile'));

  // useEffect(() => {
  //   const { _id, firstname, lastname, username, email } = profile.result;
  //   const userProfile = {
  //     _id,
  //     email,
  //     username,
  //     firstname,
  //     lastname
  //   };
  //   setUser(userProfile);

  // }, [profile]);
  // useEffect(() => {
  //   const token = profile?.token;

  // setProfile(JSON.parse(localStorage.getItem('profile')));
  // },[props.user]);

  useEffect(() => {

    setProfile(JSON.parse(localStorage.getItem('profile')));
    //setLoaded(true);
  },[isLoggedIn])



  useEffect(() => {
    if (profile) {
      const { _id, firstname, lastname, username, email } = profile?.result;
      const userProfile = {
        _id,
        email,
        username,
        firstname,
        lastname
      };
      //console.log(userProfile)
      setUser({ ...userProfile });
      //setLoaded(true);
    }
    // else {
    //   setUser(null);
    // }
  },[profile])


  if (isLoggedIn) {
    const userData = JSON.parse(localStorage.getItem('profile'));
    //console.log(userData)
    // setProfile(userData);
    // history.push('/');
   // const { username, email } = profile?.result;

    navLinks = (
      <div>
        <ProfileButton  userData={userData} logout={logout} setIsLoggedIn={setIsLoggedIn} setProfile={setProfile}/>
      </div>
    );
  } else {
    navLinks = (
      <div className="navbar__buttons">
        <div className="navbar__login-button">
          <AuthForm action={"Login"} setIsLoggedIn={setIsLoggedIn} setProfile={setProfile} />
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
