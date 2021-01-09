import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

//TO DO: CONNECT WITH ACTUAL USER SETTINGS. Currently hardcoded for triggering every one minute

//Checks whether Interval break is triggered
export default function checkIntervalBreak(history)
{
  if (store.getState().past.intervalBreakData.minsAppRunningAfterLastIntervalBreak >= 1) {
    store.dispatch(PastActions.addIntervalBreak())
    if (!(store.getState().break.breakState === "break") && !(store.getState().break.breakState === "break-feedback") && !(store.getState().break.breakState === "break-popup")) {
      let timeNow = new Date().toISOString()
      store.dispatch(BreakActions.startPopup(timeNow))
      setTimeout(() => {
        let breakData = {
          breakType: 'interval',
          breakDescription: 'NA',
          breakStartTime: new Date().toISOString(),
          breakDuration: 80,
        }
        if ((store.getState().break.breakState === "break-popup") && (store.getState().break.popupStartTime === timeNow)) {
          store.dispatch(BreakActions.startBreak(breakData))
        }
      }, 10000)
    }
  }
}