import { BreakActions, PastActions } from "../redux/actions";
import { store } from "../redux";
import axios from "axios";
var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

export default function weeklyChecker() {
  const Notification = electron.remote.Notification;

  const options = {
    title: "PAL Weekly Form",
    body: "Please fill up the weekly form by either clicking here or going to the weekly form tab on the PAL app.",
    silent: false,
    hasReply: true,
    timeoutType: "never",
    urgency: "critical",
    actions: [
      {
        type: "button",
        text: "Open App",
      },
    ],
  };

  const customNotification = new Notification(options);
  customNotification.addListener("click", () => {
    curWindow.restore();
  });

  let currWeekly = store.getState().onboarding.weekly;
  let lenVal = currWeekly.length;
  let timeNow = new Date();
  let pastTime = new Date(store.getState().onboarding.timestamp);
  const diffTime = Math.abs(timeNow - pastTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //change before deploying
  if (diffDays >= lenVal * 1) {
    // store.dispatch(PastActions.setWeeklyRem(true));
    customNotification.show();
  }
}
