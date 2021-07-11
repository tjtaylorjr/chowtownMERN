import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/auth';

const ProfileButton = (props) => {

  const [isHidden, setIsHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const { user, isLoggedIn, setIsLoggedIn, setProfile } = props;
  //const user = useSelector(state => state.user);
  // console.log(user)
  const dispatch = useDispatch();
  const history = useHistory();

  const showMenu = () => {
    if(!isHidden) return;
    setIsHidden(false);
  };

  useEffect(() => {
    if (user) {
      console.log(user)
      setEmail(user.result.email);
      setUsername(user.result.username);
      setProfile(true);
    } else {
      setProfile(false);
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
    setProfile();

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
