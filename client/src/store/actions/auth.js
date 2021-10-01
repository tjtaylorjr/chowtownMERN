import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser, authorizeWithGoogle, registerUser, restoreUser} from '../../services/userServices';

const setLoginState = (user) => {
  return {
    type: SET_USER,
    user
  }
};

export const login = ( userInfo, history, setShowModal ) => async (dispatch) => {
  try {
    const user = await authorizeUser(userInfo);
    dispatch(setLoginState({...user}));
    setShowModal(false);
    history.push('/');
  } catch (err) {
    console.error(`Authentication failure: ${err}`);
  };
};

export const googleLogin = ( userInfo, history, setShowModal, setIsLoggedIn ) => async (dispatch) => {

  const {email} = userInfo.result;
  try {
    const {_id, username} = await authorizeWithGoogle(email);
    //console.log(_id)
    userInfo.result._id = _id;
    userInfo.result.username = username;

    dispatch(setLoginState({...userInfo}));
    setShowModal(false);
    setIsLoggedIn(true);
    history.push('/');
  } catch (err) {
    console.error(`Authentication failure: ${err}`);
  };
}

export const signup = ( userInfo, history, setShowModal ) => async (dispatch) => {
  try {
    const res = await registerUser(userInfo);
    //console.log(res)
    if (res.message !== "success") {
      throw res
    } else {
      const user = await authorizeUser(userInfo);
      dispatch(setLoginState({...user}));
      setShowModal(false);
      history.push('/');
    }
  } catch (err) {
    console.error(`Registration failure: ${err}`);
  };
};

export const googleSignup = ( userInfo, history, setShowModal ) => async (dispatch) => {
  console.log(userInfo.result)
  try {
    const res = await registerUser(userInfo.result);
  } catch (err) {
    console.error(`Authentication failure: ${err}`);
  };
}
export const restore = ( jwt, history ) => async (dispatch) => {
  try {
    const user = await restoreUser(jwt);
    dispatch(setLoginState({...user}));
    history.push('/')
  } catch(err) {
    console.error(`User not authorized.  Please log back in. ${err}`);
  }
};

export const logout = () => {
  return {
    type: CLEAR_USER
  };
};
