import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();
const isDev = window.require("electron-is-dev");
const path = window.require("path");

//handles window and route changes when break-state changes
export default function eventHandler(history) {
  //sets screen back to normal if no break
  if (
    store.getState().break.breakState === "no-break" &&
    !store.getState().break.windowChanged
  ) {
    curWindow.setOpacity(1);
    curWindow.unmaximize();
    curWindow.setSize(1400, 800);
    curWindow.minimize();
    history.push("/");
    store.dispatch(BreakActions.setWindowChanged());
    curWindow.setAlwaysOnTop(false);
    curWindow.reload();
  }

  //sets screen to popup window size if break-popup
  else if (
    store.getState().break.breakState === "break-popup" &&
    !store.getState().break.windowChanged
  ) {
    curWindow.setAlwaysOnTop(true, "pop-up-menu");
    curWindow.restore();
    history.push("/popup");
    //curWindow.maximize()
    curWindow.unmaximize();
    curWindow.setSize(1000, 800);
    curWindow.center();

    store.dispatch(BreakActions.setWindowChanged());
  } else if (store.getState().break.breakState === "pre-break-feedback") {
    history.push("/prefeedback");
    curWindow.center();
  } else if (store.getState().break.breakState === "break-stroop") {
    history.push("/stroop");
    curWindow.center();
  } else if (store.getState().break.breakState === "break-fruit") {
    curWindow.unmaximize();
    curWindow.setSize(1000, 800);
    curWindow.setOpacity(1);
    curWindow.center();

    curWindow.setMovable(true);
    history.push("/fruit");
  } else if (store.getState().break.breakState === "break-feedback") {
    curWindow.maximize();
    curWindow.setAlwaysOnTop(false);
    history.push("/feedback");
  }

  //sets window to full screen if break, and also ends the break after break time is over
  else if (
    store.getState().break.breakState === "break" &&
    !store.getState().break.windowChanged
  ) {
    curWindow.setOpacity(0.8);
    curWindow.maximize();
    curWindow.setAlwaysOnTop(true);

    history.push("/break");
    store.dispatch(BreakActions.setWindowChanged());
    let s1 = store.getState().break.breakStartTime;
    setTimeout(() => {
      if (
        store.getState().break.breakState === "break" &&
        s1 === store.getState().break.breakStartTime
      ) {
        store.dispatch(BreakActions.startFruit());
      }
    }, store.getState().break.breakDuration * 1000);
  } else if (store.getState().onboarding.weeklyRem) {
    curWindow.restore();
    history.push("/weekpop");
    //curWindow.maximize()
    curWindow.unmaximize();
    curWindow.setSize(1000, 800);
    curWindow.center();
    setTimeout(() => {
      store.dispatch(PastActions.setWeeklyRem(false));
      history.push("/home");
    }, 60000);
  }
}
