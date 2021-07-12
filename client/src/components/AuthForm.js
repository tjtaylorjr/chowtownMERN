import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Modal } from '../context/Modal';
import { login, googleLogin, signup } from '../store/actions/auth';
import { FcGoogle } from 'react-icons/fc';


const AuthForm = (props) => {
  const defaultUserState = {
    email: "",
    givenName: "",
    familyName: "",
    username: "",
    password: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({type: props.action});
  const [userInfo, setUserInfo] = useState(defaultUserState);
  const { setIsLoggedIn } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const GoogleClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const googleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      const data = { result, token };
      dispatch(googleLogin(data, history, setShowModal, setIsLoggedIn));
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
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(modalState.type === "Login") {
      try {
        dispatch(login(userInfo, history, setShowModal));
        setIsLoggedIn(true);
      }catch(err) {
        console.error(err)
      }
    }
    if(modalState.type === "Signup") {
      try {
        dispatch(signup(userInfo, history, setShowModal));
        setIsLoggedIn(true);
      } catch(err) {
        console.error(err)
      }
    }
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
                      id="givenName"
                      placeholder="Enter First Name"
                      required
                      value={userInfo.givenName}
                      onChange={handleInputChange}
                      name="givenName"
                    />
                  </div>
                  <div className="auth-form__input">
                    <input
                      type="text"
                      id="familyName"
                      placeholder="Enter Last Name"
                      required
                      value={userInfo.familyName}
                      onChange={handleInputChange}
                      name="familyName"
                    />
                  </div>
                  <div className="auth-form__input">
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Username"
                      required
                      value={userInfo.username}
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
                  value={userInfo.email}
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
                  value={userInfo.password}
                  onChange={handleInputChange}
                  name="password"
                />
              </div>
              <button
                type="submit"
                className="auth-form__submit-button"
              >
                {modalState.type}
              </button>
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
                      {`Login with Google`}</button>
                    )}
                  buttonText="Login with Google"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={'single_host_origin'}
                  isLoggedIn={true}
                />
              )}
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
