import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AllReducers from "./reducers/AllReducers";

const rootReducer = combineReducers({
  auth: AllReducers,
});

const configureStore = createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
