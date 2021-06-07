import React, { useState, useEffect } from 'react';

const ProfileButton = (props) => {

  const [isHidden, setIsHidden] = useState(true);

  const { user } = props;
  console.log(user);

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
  };

  return (
    <div className="profile-button__container">
      <button onClick={showMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {!isHidden && (
        <ul>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={endSession}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileButton;
