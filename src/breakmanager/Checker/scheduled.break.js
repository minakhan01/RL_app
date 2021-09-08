import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

//TO DO: CONNECT WITH ACTUAL USER SETTINGS. Currently not hardcoded anything

//Checks whether Scheduled break is triggered
export default function checkScheduledBreak() {
  //Scheduled break if condition goes here
  if (false) {
    if (
      !(store.getState().break.breakState === "break") &&
      !(store.getState().break.breakState === "break-feedback") &&
      !(store.getState().break.breakState === "break-popup")
    ) {
      let timeNow = new Date().toISOString();
      store.dispatch(BreakActions.startPopup(timeNow));
      setTimeout(() => {
        let breakData = {
          breakType: "scheduled",
          breakDescription: "NA",
          breakStartTime: new Date().toISOString(),
          breakDuration: 80,
        };
        if (
          store.getState().break.breakState === "break-popup" &&
          store.getState().break.popupStartTime === timeNow
        ) {
          store.dispatch(BreakActions.startBreak(breakData));
        }
      }, 10000);
    }
  }
}
