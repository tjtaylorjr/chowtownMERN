import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser, registerUser, restoreUser} from '../../services/userServices';

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
