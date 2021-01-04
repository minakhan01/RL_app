import { combineReducers, Reducer } from "redux";
import TestReducer from "./test.reducer";
import BreakReducer from "./break.reducer";

const allReducers = {
  test: TestReducer,
  break: BreakReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
