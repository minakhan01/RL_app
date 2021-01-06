import { combineReducers, Reducer } from "redux";
import TestReducer from "./test.reducer";
import BreakReducer from "./break.reducer";
import PastReducer from "./past.reducer";


const allReducers = {
  test: TestReducer,
  break: BreakReducer,
  past: PastReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
