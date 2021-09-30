import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

//TO DO: CONNECT WITH ACTUAL USER SETTINGS. Currently not hardcoded anything

//Checks whether Scheduled break is triggered
export default function checkScheduledBreak() {
  //Scheduled break if condition goes here
  let weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let onboardingProps = store.getState().onboarding;
  for (let indBreak of onboardingProps["scheduledBreaks"]) {
    let timeNow = new Date();
    let dayVal = weekDays[timeNow.getDay()];
    if (indBreak.day === dayVal) {
      let startTime = new Date(indBreak.start);
      let endTime = new Date(indBreak.end);
      let currentStart = new Date();
      currentStart.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
      let currentEnd = new Date();
      currentEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
      let lastEndTime = new Date(store.getState().past.lastScheduledBreak);
      if (currentStart <= timeNow && currentEnd >= timeNow) {
        if (
          !(store.getState().break.breakState === "break") &&
          !(store.getState().break.breakState === "break-feedback") &&
          !(store.getState().break.breakState === "break-popup") &&
          !(store.getState().break.breakState === "break-stroop") &&
          !(store.getState().break.breakState === "break-fruit") &&
          !(store.getState().break.breakState === "cancel-break") &&
          !(lastEndTime > currentStart)
        ) {
          let timeNowNew = new Date();
          let breakData = {
            breakType: "scheduled",
            breakDescription: "NA",
            breakStartTime: timeNowNew,
            breakDuration: (currentEnd - timeNow) / 1000,
            breakEndTime: indBreak.end,
          };
          store.dispatch(BreakActions.startPopup(timeNowNew, breakData));
          setTimeout(() => {
            if (
              store.getState().break.breakState === "break-popup" &&
              store.getState().break.popupStartTime === timeNowNew
            ) {
              store.dispatch(BreakActions.startStroop());
            }
          }, 10000);
        }
      }
    }
  }
}
