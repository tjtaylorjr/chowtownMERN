import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal';

const AuthForm = (props) => {
  const defaultUserState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(defaultUserState);

  const history = useHistory();
  const { flag } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.mockLogin(user);
    history.push('/');
  };

  return (
    <>
      <button
        type="button"
        className="auth__button"
        onClick={() => setShowModal(true)}
      >
        {flag}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-form__container">
            <form className="login-form" onSubmit={handleSubmit}>
              {flag === "Signup" && (
                <>
                  <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      id="firstname"
                      required
                      value={user.firstname}
                      onChange={handleInputChange}
                      name="firstname"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      required
                      value={user.lastname}
                      onChange={handleInputChange}
                      name="lastname"
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  required
                  value={user.username}
                  onChange={handleInputChange}
                  name="username"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  required
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                />
              </div>
              <button type="submit">
                {flag}
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AuthForm;
