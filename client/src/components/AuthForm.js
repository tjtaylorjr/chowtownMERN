import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Modal } from '../context/Modal';
import { FcGoogle } from 'react-icons/fc';

const AuthForm = (props) => {
  const defaultUserState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({type: props.action});
  const [user, setUser] = useState(defaultUserState);

  const dispatch = useDispatch();
  const history = useHistory();
  const GoogleClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const googleSuccess = async (response) => {
    console.info(response?.profileObj, response?.tokenId);
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch({ type: 'SET_USER', data: { result, token } });
      setShowModal(false);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const googleFailure = (response) => {
    console.info(`Google Sign in unsuccessful: ${response}`);
  };

  const handleInputChange = (event) => {
    //name here refers to the name property of the input field
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
        {props.action}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="auth-form__container">
            <form className="auth-form" onSubmit={handleSubmit}>
              {modalState.type === "Signup" && (
                <>
                  <div className="auth-form__input">
                    <input
                      type="text"
                      id="firstname"
                      placeholder="Enter First Name"
                      required
                      value={user.firstname}
                      onChange={handleInputChange}
                      name="firstname"
                    />
                  </div>
                  <div className="auth-form__input">
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Enter Last Name"
                      required
                      value={user.lastname}
                      onChange={handleInputChange}
                      name="lastname"
                    />
                  </div>
                  <div className="auth-form__input">
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Username"
                      required
                      value={user.username}
                      onChange={handleInputChange}
                      name="username"
                    />
                  </div>
                </>
              )}
              <div className="auth-form__input">
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
              <div className="auth-form__input">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                />
              </div>
              {modalState.type === "Login" && (
                <GoogleLogin
                  clientId={GoogleClientId}
                  render={renderProps => (
                    <button
                      className="auth-form__google-button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <span>
                        <FcGoogle className="auth-form__google-icon" />
                      </span>
                      {`${modalState.type} with Google`}</button>
                    )}
                  buttonText="Login"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={'single_host_origin'}
                  isLoggedIn={true}
                />
              )}
              <button
                type="submit"
                className="auth-form__submit-button"
              >
                {modalState.type}
              </button>
              {modalState.type === "Login" ? (
                <div>
                  {`Don't have an account?`}
                  <NavLink
                    className="auth-form__swap-link"
                    to={"#"}
                    onClick={(event) => {
                      event.preventDefault();
                      setModalState({type: "Signup"});
                    }}
                  >Signup.</NavLink>
                </div>
              ) : (
                  <div>
                    {`Already have an account?`}
                    <NavLink
                      className="auth-form__swap-link"
                      to={"#"}
                      onClick={(event) => {
                        event.preventDefault();
                        setModalState({type: "Login"});
                      }}
                    >Login.</NavLink>
                  </div>
              )}
              <NavLink
                to={"/tos"}
                className="auth-form__terms-link"
                onClick={() => setShowModal(false)}
              >
                Terms of Service
              </NavLink>
              <NavLink
                to={"/privacy"}
                className="auth-form__terms-link"
                onClick={() => setShowModal(false)}
              >
                Privacy Policy
              </NavLink>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AuthForm;
