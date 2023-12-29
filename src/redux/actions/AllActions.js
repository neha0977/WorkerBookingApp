import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from "./type";
import { signIn, signOut, signUp } from "../../utils/databaseHelper/FireBase";

export const signInUser = (user) => async (dispatch) => {
  try {
    signIn(user);
    dispatch({ type: LOGIN_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const signUpUser = (user) => async (dispatch) => {
  try {
    signUp(user);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    signOut();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};
