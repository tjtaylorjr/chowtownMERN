import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProfileButton = (props) => {

  const [isHidden, setIsHidden] = useState(true);

  const { logout, setIsLoggedIn, setProfile } = props;
  //const { username, email } = props.userData?.result;
  const username = props.userData ? props.userData.result.username : "";
  const email = props.userData ? props.userData.result.email : "";
  //const { username, email } = props.userData;
  // let username;
  // let email;
  // if(userData) {
  //   username = userData?.result.username;
  //   email = userData?.result.email;
  // }
  //console.log(user);
  const dispatch = useDispatch();
  const history = useHistory();

  const showMenu = () => {
    if(!isHidden) return;
    setIsHidden(false);
  };

  useEffect(() => {
    if(isHidden) return;

    const hideMenu = () => {
      setIsHidden(true);
    };

    document.addEventListener('click', hideMenu);

    return () => document.removeEventListener('click', hideMenu);
  }, [isHidden])

  const endSession = (event) => {
    event.preventDefault();
    //do something to cause logout
    dispatch({ type: 'CLEAR_USER' });
    setIsLoggedIn(false);
    setProfile();
    //logout();
    //history.push('/');
  };

  return (
    <div className="profile-button__container">
      <button onClick={showMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {!isHidden && (
        <ul>
          <li>{username}</li>
          <li>{email}</li>
          <li>
            <button onClick={endSession}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileButton;
