import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services";
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
        let totalUsage = 0;

        websiteTotals.map((ob, index) => {
          if (
            indBreak.url.length > 0 &&
            ob.data.url.includes(indBreak.url) &&
            !(store.getState().break.breakState === "break") &&
            !(store.getState().break.breakState === "break-feedback") &&
            !(store.getState().break.breakState === "break-popup")
          ) {
            totalUsage = totalUsage + ob.duration;
          }
        });
        let currentBreaksTriggered = store.getState().break.breaksTriggered;
        let numberBreaks = Math.ceil(totalUsage / (60 * indBreak.interval));
        if (currentBreaksTriggered[indBreak.url]) {
          numberBreaks = currentBreaksTriggered[indBreak.url];
        } else if (numberBreaks > 0) {
          currentBreaksTriggered[indBreak.url] = numberBreaks;
          store.dispatch(
            BreakActions.setBreakTriggered(currentBreaksTriggered)
          );
        }
        if (
          totalUsage / 60 > indBreak.interval * numberBreaks &&
          totalUsage > 0 &&
          numberBreaks > 0
        ) {
          if (currentBreaksTriggered[indBreak.url]) {
            currentBreaksTriggered[indBreak.url] += 1;
          } else {
            currentBreaksTriggered[indBreak.url] = Math.ceil(
              totalUsage / (60 * indBreak.interval)
            );
          }
          store.dispatch(
            BreakActions.setBreakTriggered(currentBreaksTriggered)
          );
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
          break;
        }
      }
    })
    .catch(console.log);
}
