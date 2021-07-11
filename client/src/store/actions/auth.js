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
    //console.log(formData);
    const user = await authorizeUser(userInfo);
    console.log(user)
    //dispatch({ type: SET_USER, data });
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

    if (!res.ok) {
      throw res
    } else {
      // reuse login function after registration
      const user = await authorizeUser(userInfo);
      dispatch(setLoginState({...user}));
      //dispatch({ type: SET_USER, user});
      setShowModal(false);
      history.push('/');
    }
  } catch (err) {
    console.error(`Registration failure: ${err}`);
  };
};

export const restore = ( jwt, history ) => async (dispatch) => {
  //console.log(jwt)
  try {
    const user = await restoreUser(jwt);
    //console.log(user)
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
