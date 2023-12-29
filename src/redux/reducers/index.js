// index.js
import { combineReducers } from "redux";
import AllReducers from "./AllReducers";

const rootReducer = combineReducers({
  auth: AllReducers,
});

export default rootReducer;
