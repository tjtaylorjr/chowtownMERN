import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/auth';

const ProfileButton = (props) => {

  const [isHidden, setIsHidden] = useState(true);

  const { user, setIsLoggedIn, setProfile } = props;
  //const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(user)

  const showMenu = () => {
    if(!isHidden) return;
    setIsHidden(false);
  };

  useEffect(() => {
    if (user) {
      const {_id, email, username, firstname, lastname} = user;
      const profile = {
        _id,
        email,
        username,
        firstname,
        lastname
      }
      setProfile(profile);
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
          <li>{user?.username}</li>
          <li>{user?.email}</li>
          <li>
            <button onClick={endSession}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileButton;
