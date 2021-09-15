import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

//Checks whether Interval break is triggered
export default function checkIntervalBreak(history) {
  let onboardingProps = store.getState().onboarding;
  let pastProps = store.getState().past;
  if (
    pastProps.intervalBreakData.minsAppRunningAfterLastIntervalBreak >=
    onboardingProps.regularBreakLength
  ) {
    store.dispatch(PastActions.addIntervalBreak());
    if (
      !(store.getState().break.breakState === "break") &&
      !(store.getState().break.breakState === "break-feedback") &&
      !(store.getState().break.breakState === "break-popup")
    ) {
      let timeNow = new Date().toISOString();
      let breakData = {
        breakType: "interval",
        breakDescription: "NA",
        breakDuration: onboardingProps.regularBreakLength * 60,
      };
      store.dispatch(BreakActions.startPopup(timeNow, breakData));
      setTimeout(() => {
        if (
          store.getState().break.breakState === "break-popup" &&
          store.getState().break.popupStartTime === timeNow
        ) {
          store.dispatch(BreakActions.startBreak());
        }
      }, 10000);
    }
  }
}
