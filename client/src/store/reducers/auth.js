import { CLEAR_USER, SET_USER } from '../constants/actionTypes';

const initialState = {
  userData: null,
}

//shape of state:
// {
//   userData: {
//     id,
//     firstname,
//     lastname,
//     username,
//     email
//   }
// }

const authReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CLEAR_USER:
      return state;
    case SET_USER:
      console.log(action?.data);
      newState = { ...state };
      newState.userData = action?.data
      localStorage.setItem('profile', JSON.stringify({...newState}));
      return newState;
    default:
      return state;
  }
}

export default authReducer;
