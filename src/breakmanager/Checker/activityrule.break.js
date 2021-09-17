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
              !(store.getState().break.breakState === "break-fruit")
            ) {
              totalUsage = totalUsage + ob.duration;
            }
          });
          let preGame = Math.ceil(totalUsage / (60 * indBreak.interval));
          console.log("prte", preGame);
          let initScheduled = store.getState().past.initScheduled;
          if (initScheduled[indBreak.url]) {
            preGame = initScheduled[indBreak.url];
          }
          console.log("ya", initScheduled);
          let currentBreaksTriggered = store.getState().break.breaksTriggered;
          let numberBreaks = 0;
          if (currentBreaksTriggered[indBreak.url]) {
            numberBreaks = currentBreaksTriggered[indBreak.url];
          }
          currentBreaksTriggered[indBreak.url] = numberBreaks;
          initScheduled[indBreak.url] = preGame;
          store.dispatch(
            BreakActions.setBreakTriggered(currentBreaksTriggered)
          );
          store.dispatch(PastActions.saveInitBreakData(initScheduled));
          console.log("num", numberBreaks);
          console.log("ya num", totalUsage / 60);
          console.log("has num", indBreak.interval);
          if (preGame === 0) {
            if (totalUsage / 60 > indBreak.interval && totalUsage > 0) {
              console.log("ya", totalUsage / 60);
              console.log("has", indBreak.interval);
              if (currentBreaksTriggered[indBreak.url]) {
                currentBreaksTriggered[indBreak.url] += 1;
                initScheduled[indBreak.url] += 1;
              }
              store.dispatch(
                BreakActions.setBreakTriggered(currentBreaksTriggered)
              );
              store.dispatch(PastActions.saveInitBreakData(initScheduled));
              let timeNow = new Date().toISOString();

              let breakData = {
                breakType: "activity-rule (continuous)",
                breakDescription: indBreak.name,
                breakDuration: indBreak.breakLength * 60,
              };
              store.dispatch(BreakActions.startPopup(timeNow, breakData));
              // setTimeout(() => {
              //   if (
              //     store.getState().break.breakState === "break-popup" &&
              //     store.getState().break.popupStartTime === timeNow
              //   ) {
              //     store.dispatch(BreakActions.startBreak());
              //   }
              // }, 10000);
            }
          } else {
            if (
              totalUsage / 60 > indBreak.interval * preGame &&
              totalUsage > 0
            ) {
              console.log("yaasas", totalUsage / 60);
              console.log("hasasa", indBreak.interval * preGame);
              if (currentBreaksTriggered[indBreak.url]) {
                currentBreaksTriggered[indBreak.url] += 1;
                initScheduled[indBreak.url] += 1;
              }
              store.dispatch(
                BreakActions.setBreakTriggered(currentBreaksTriggered)
              );
              store.dispatch(PastActions.saveInitBreakData(initScheduled));
              let timeNow = new Date().toISOString();

              let breakData = {
                breakType: "activity-rule (continuous)",
                breakDescription: indBreak.name,
                breakDuration: indBreak.breakLength * 60,
              };
              store.dispatch(BreakActions.startPopup(timeNow, breakData));
              // setTimeout(() => {
              //   if (
              //     store.getState().break.breakState === "break-popup" &&
              //     store.getState().break.popupStartTime === timeNow
              //   ) {
              //     store.dispatch(BreakActions.startBreak());
              //   }
              // }, 10000);
            }
          }
        }
      }
    })
    .catch(console.log);
}
