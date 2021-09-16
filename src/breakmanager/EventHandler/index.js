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
    curWindow.setSize(1200, 1000);
    curWindow.minimize();
    history.push("/");
    store.dispatch(BreakActions.setWindowChanged());
    curWindow.setAlwaysOnTop(false);
  }

  //sets screen to popup window size if break-popup
  else if (
    store.getState().break.breakState === "break-popup" &&
    !store.getState().break.windowChanged
  ) {
    curWindow.restore();
    history.push("/popup");
    //curWindow.maximize()
    curWindow.unmaximize();
    curWindow.setSize(800, 600);
    curWindow.center();
    curWindow.setAlwaysOnTop(true, "pop-up-menu");

    store.dispatch(BreakActions.setWindowChanged());
  } else if (store.getState().break.breakState === "break-stroop") {
    history.push("/stroop");
  } else if (store.getState().break.breakState === "break-fruit") {
    history.push("/fruit");
  }

  //sets window to full screen if break, and also ends the break after break time is over
  else if (
    store.getState().break.breakState === "break" &&
    !store.getState().break.windowChanged
  ) {
    curWindow.setOpacity(0.8);
    curWindow.maximize();

    history.push("/break");
    store.dispatch(BreakActions.setWindowChanged());
    let s1 = store.getState().break.breakStartTime;
    setTimeout(() => {
      if (
        store.getState().break.breakState === "break" &&
        s1 === store.getState().break.breakStartTime
      )
        store.dispatch(
          BreakActions.endBreak(store.getState().break.breakEndTime)
        );
      curWindow.setAlwaysOnTop(false);
      curWindow.setMovable(true);
    }, store.getState().break.breakDuration * 1000);
  }
}
