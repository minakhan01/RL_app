import { combineReducers, Reducer } from "redux";
import TestReducer from "./test.reducer";

const allReducers = {
  test: TestReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
