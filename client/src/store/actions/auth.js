import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser } from '../../services/userServices';

export const login = ( formData, history ) => async (dispatch) => {
  try {
    const { data } = await authorizeUser(formData);
    dispatch({ type: SET_USER, data });

    history.push('/');
  } catch (err) {
    console.error(`Authentication failure: ${err}`);
  };
};

export const signup = ( formData, history ) => async(dispatch) => {
  try {
    
    // reuse login function after registration
    const { data } await authorizeUser(formData);
    dispatch({ type: SET_USER, data});
    history.push('/');
  } catch (err) {
    console.error(`Registration failure: ${err}`);
  };
};
