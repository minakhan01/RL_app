import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services";
import psl from "psl";
let client = new AWClientService();

//TO DO: CONNECT WITH ACTUAL USER SETTINGS. Currently hardcoded for Facebook continuous usage above 20 seconds
//TO DO: SIMILAR CHECK FOR CUMULATIVE USAGE

//checks whether activity rule break is to be triggered
export default function checkActivityRuleBreak() {
  client
    .getAppTotals()
    .then((allValues) => {
      let onboardingProps = store.getState().onboarding;
      const activityBreaks = onboardingProps.allOverRides;
      const websiteTotals = allValues.websiteTotals;
      for (let indBreak of activityBreaks) {
        if (indBreak.url.length > 0) {
          let totalUsage = 0;
          let parsed = psl.parse(indBreak.url);
          let siteName = parsed.sld;
          websiteTotals.map((ob, index) => {
            if (
              siteName.length > 0 &&
              ob.data.url.includes(siteName) &&
              !(store.getState().break.breakState === "break") &&
              !(store.getState().break.breakState === "break-feedback") &&
              !(store.getState().break.breakState === "break-popup") &&
              !(store.getState().break.breakState === "break-stroop") &&
              !(store.getState().break.breakState === "break-fruit") &&
              !(store.getState().break.breakState === "cancel-break")
            ) {
              totalUsage = totalUsage + ob.duration;
            }
          });
          let preGame = Math.ceil(totalUsage / (60 * indBreak.interval));
          let initScheduled = store.getState().past.initScheduled;
          let today = store.getState().past.initScheduled;
          if (today.length === 0) {
            today = new Date();
            store.dispatch(PastActions.setToday(today.toISOString()));
          } else {
            today = new Date(today);
          }
          if (
            today.getDate() !== new Date().getDate() ||
            today.getMonth() !== new Date().getMonth()
          ) {
            today = new Date();
            store.dispatch(PastActions.setToday(today.toISOString()));
          } else {
            initScheduled[indBreak.url] = preGame;
          }
          if (initScheduled[indBreak.url]) {
            preGame = initScheduled[indBreak.url];
          }

          initScheduled[indBreak.url] = preGame;
          store.dispatch(PastActions.saveInitBreakData(initScheduled));
          if (preGame === 0) {
            if (totalUsage / 60 > indBreak.interval && totalUsage > 0) {
              initScheduled[indBreak.url] += 1;

              store.dispatch(PastActions.saveInitBreakData(initScheduled));
              let timeNow = new Date().toISOString();

              let breakData = {
                breakType: "activity-rule (continuous)",
                breakDescription: indBreak.name,
                breakDuration: indBreak.breakLength * 60,
                breakStartTime: timeNow,
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
          } else {
            if (
              totalUsage / 60 > indBreak.interval * preGame &&
              totalUsage > 0
            ) {
              initScheduled[indBreak.url] += 1;

              store.dispatch(PastActions.saveInitBreakData(initScheduled));
              let timeNow = new Date().toISOString();

              let breakData = {
                breakType: "activity-rule (continuous)",
                breakDescription: indBreak.name,
                breakDuration: indBreak.breakLength * 60,
                breakStartTime: timeNow,
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
      }
    })
    .catch(console.log);
}
