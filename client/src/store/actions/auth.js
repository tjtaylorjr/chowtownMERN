import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser, registerUser } from '../../services/userServices';

const setLoginState = (user) => {
  return {
    type: SET_USER,
    user
  }
};

export const login = ( userInfo, history, setShowModal ) => async (dispatch) => {
  try {
    //console.log(formData);
    const { result } = await authorizeUser(userInfo);
    //dispatch({ type: SET_USER, data });
    dispatch(setLoginState({...result}));
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
      const { result } = await authorizeUser(userInfo);
      dispatch(setLoginState({...result}));
      //dispatch({ type: SET_USER, user});
      setShowModal(false);
      history.push('/');
    }
  } catch (err) {
    console.error(`Registration failure: ${err}`);
  };
};

export const logout = () => {
  return {
    type: CLEAR_USER
  };
};
