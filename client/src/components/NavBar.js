import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restore } from '../store/actions/auth';
import ProfileButton from './ProfileButton';
import AuthForm from './AuthForm';
import logo from '../assets/textless-logo.png';
import brandName from '../assets/brand.png';

const NavBar = (props) => {
  // const[profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const[profile, setProfile] = useState(false);
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  //const[loaded, setLoaded] = useState(false);
  const { setUser, logout } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  // console.log(user)
  // if(user) {
  //   console.log("hi")
  // } else {
  //   console.log("nope")
  // }
  let jwt = JSON.parse(localStorage.getItem('profile'));


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
  useEffect(() => {
    if (jwt) {
      //console.log(jwt);
      dispatch(restore(jwt, history))
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      jwt = JSON.parse(localStorage.getItem('profile'));
    }
  },[]);

  // useEffect(() => {

  //   setProfile(JSON.parse(localStorage.getItem('profile')));
  //   //setLoaded(true);
  // },[isLoggedIn])



  // useEffect(() => {
  //   if (profile) {
  //     const { _id, firstname, lastname, username, email } = profile?.result;
  //     const userProfile = {
  //       _id,
  //       email,
  //       username,
  //       firstname,
  //       lastname
  //     };

  //     setUser({ ...userProfile });
  //   }
  // },[profile])


  if (isLoggedIn) {
    //const userData = JSON.parse(localStorage.getItem('profile'));
    //console.log(userData)
    // setProfile(userData);
    // history.push('/');
   // const { username, email } = profile?.result;

    navLinks = (
      <div>
        <ProfileButton  user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setProfile={setProfile}/>
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
