import { BreakActions, PastActions } from "../redux/actions";
import { store } from "../redux";
import axios from "axios";
export default function weeklyChecker() {
  console.log("weekly");
  let currWeekly = store.getState().onboarding.weekly;
  let lenVal = currWeekly.length + 1;
  let timeNow = new Date();
  let pastTime = new Date(store.getState().onboarding.timestamp);
  const diffTime = Math.abs(timeNow - pastTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays >= lenVal * 7) {
    store.dispatch(PastActions.setWeeklyRem(true));
  }
}
