import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

const ProfileButton = (props) => {

  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const { user, setIsLoggedIn, setIsLoaded } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const showMenu = () => {
    if(!isHidden) return;
    setIsHidden(false);
  };

  useEffect(() => {
    if (user) {
      setEmail(user.result.email);
      setUsername(user.result.username);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  },[user]);

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

    dispatch(logout());
    setIsLoggedIn(false);
    setIsLoaded(false);

    history.push('/');
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
