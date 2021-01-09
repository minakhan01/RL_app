import { combineReducers, Reducer } from "redux";
import TestReducer from "./test.reducer";
import OnboardingReducer from "./onboarding.reducer";

const allReducers = {
  test: TestReducer,
  onboarding: OnboardingReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
