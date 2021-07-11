import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser } from '../../services/userServices';

const setLoginState = (data) => {
  return {
    type: SET_USER,
    data
  }
};

export const login = ( userInfo, history, setShowModal ) => async (dispatch) => {
  try {
    //console.log(formData);
    const { data } = await authorizeUser(userInfo);
    //dispatch({ type: SET_USER, data });
    dispatch(setLoginState({...data}));
    setShowModal(false);
    history.push('/');
  } catch (err) {
    console.error(`Authentication failure: ${err}`);
  };
};

export const signup = ( userInfo, history ) => async (dispatch) => {
  try {

    // reuse login function after registration
    const { data } = await authorizeUser(userInfo);
    dispatch({ type: SET_USER, data});
    //history.push('/');
  } catch (err) {
    console.error(`Registration failure: ${err}`);
  };
};
