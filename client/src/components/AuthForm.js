import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { Modal } from '../context/Modal';
import { login, googleLogin, signup } from '../store/actions/auth';
import { FcGoogle } from 'react-icons/fc';
import { getOAuthClient } from '../services/userServices';


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
  const [GoogleClientId, setGoogleClientId] = useState("");

  const { setIsLoggedIn } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const demoEmail = "demo@chowtown.io";
  let emailIndex = 0;
  const demoPass = "password";
  let passIndex = 0;

  useEffect(() => {
    (async () => {
      const OAuthClient = await getOAuthClient();
      setGoogleClientId(OAuthClient);
    })()
  },[])

  const logInDemo = async (e) => {
    e.preventDefault();
    demoAutomation();
  }

  const demoAutomation = async () => {
    const emailField = document.querySelector(".email");
    const passwordField = document.querySelector(".password");
    if (emailIndex < demoEmail.length) {
      setTimeout(() => {
        setUserInfo({ ...userInfo, ["email"]: demoEmail.substr(0, emailIndex + 1)});
        emailIndex++
        demoAutomation();
      }, 125)
    } else if (passIndex < demoPass.length) {
      setTimeout(() => {
        setUserInfo({ ...userInfo, ["email"]: demoEmail, ["password"]: demoPass.substr(0, passIndex + 1) });
        passIndex++
        demoAutomation();
      }, 125)
    } else {
      try {
        const demoInfo = {
          email: "demo@chowtown.io",
          givenName: "",
          familyName: "",
          username: "",
          password: "password",
        }
        dispatch(login(demoInfo, history, setShowModal, setIsLoggedIn));
        // setIsLoggedIn(true);
      } catch (err) {
        console.error(err)
      }
    }
  }

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
        dispatch(login(userInfo, history, setShowModal, setIsLoggedIn));
        // setIsLoggedIn(true);
      }catch(err) {
        console.error(err)
      }
    }
    if(modalState.type === "Signup") {
      try {
        dispatch(signup(userInfo, history, setShowModal, setIsLoggedIn));
        // setIsLoggedIn(true);
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
        onClick={() => {setShowModal(true); setModalState({type: props.action});}}
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
              <div className="auth-form__input email">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={userInfo.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
              <div className="auth-form__input password">
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
              <div>
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
              </div>
              {modalState.type === "Login" && (
                <>
                  <p style={{fontSize: "10px"}}>*Google login requires registered account</p>
                  <button
                    className="auth-form__demo-button"
                    type="submit"
                    onClick={logInDemo}
                  >
                    Demo
                  </button>
                </>
              )}
            </form>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AuthForm;
