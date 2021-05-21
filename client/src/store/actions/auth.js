import { CLEAR_USER, SET_USER } from '../constants/actionTypes';
import { authorizeUser } from '../../services/authServices';

export const login = ( formData, router ) => async (dispatch) {
  try {
    const { data } = await authorizeUser(formData);
    dispatch({ type: SET_USER, data });

    router.push('/');
  }
}
