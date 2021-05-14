import React from 'react';

const ProfileButton = (props) => {
  const { user } = props;
  return (
    <div className="profile-button__container">
      <button onClick={menu}>
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
