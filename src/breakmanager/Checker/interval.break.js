import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

//Checks whether Interval break is triggered
export default function checkIntervalBreak(history) {
  let onboardingProps = store.getState().onboarding;
  let pastProps = store.getState().past;
  if (
    pastProps.intervalBreakData.minsAppRunningAfterLastIntervalBreak >=
    parseInt(onboardingProps.regularBreakInterval) * 60
  ) {
    store.dispatch(PastActions.addIntervalBreak());
    if (
      !(store.getState().break.breakState === "break") &&
      !(store.getState().break.breakState === "break-feedback") &&
      !(store.getState().break.breakState === "break-popup") &&
      !(store.getState().break.breakState === "break-stroop") &&
      !(store.getState().break.breakState === "break-fruit") &&
      !(store.getState().break.breakState === "cancel-break") &&
      !(store.getState().break.breakState === "pre-break-feedback")
    ) {
      let timeNow = new Date().toISOString();
      let breakData = {
        breakType: "interval",
        breakDescription: "NA",
        breakDuration: parseInt(onboardingProps.regularBreakLength) * 60,
      };
      store.dispatch(BreakActions.startPopup(timeNow, breakData));
      setTimeout(() => {
        if (
          store.getState().break.breakState === "break-popup" &&
          store.getState().break.popupStartTime === timeNow
        ) {
          store.dispatch(BreakActions.startPrebreakfeedback());
        }
      }, 10000);
    }
  }
}
