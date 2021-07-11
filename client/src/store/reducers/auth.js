import { CLEAR_USER, SET_USER } from '../constants/actionTypes';

const initialState = {
  user: null,
}

//shape of state:
// {
//   user: {
//       result: {
           //       id,
           //       firstname,
           //       lastname,
           //       username,
           //       email
//       },
//       token
//   }
// }

const authReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CLEAR_USER:
      localStorage.removeItem('profile');
      newState = { ...state };
      newState.user = null;
      return newState;
    case SET_USER:
      localStorage.setItem('profile', JSON.stringify({ ...action?.user }));
      newState = { ...state };
      newState.user = action?.user;
      return newState;
    default:
      return state;
  }
}

export default authReducer;
