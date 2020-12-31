import { combineReducers, Reducer } from "redux";
// import AdminReducer from "./admin.reducer";

const allReducers = {
  // admin: AdminReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
