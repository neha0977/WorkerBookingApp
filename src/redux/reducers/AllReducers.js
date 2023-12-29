import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "../actions/type";
const initialState = {
  user: null,
  error: null,
};

const AllReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, user: null, error: null };
    default:
      return state;
  }
};

export default AllReducers;
