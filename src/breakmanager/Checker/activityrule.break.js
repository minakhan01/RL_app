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
      const appTotals = allValues.appTotal;
      const appTotalsUnmerged = allValues.appTotalWithoutAudioUnmerged;
      const websiteTotalsUnmerged = allValues.websiteTotalsUnmerged;
      for (let indBreak of activityBreaks) {
        if (indBreak.url.length > 0) {
          let totalUsage = 0;
          let tempUrl = indBreak.url.replace(/^\/\/|^.*?:(\/\/)?/, "");
          tempUrl = tempUrl.replace(/\/+$/, "");
          let parsed = psl.parse(tempUrl);
          let siteName = parsed.sld;
          if (siteName === "google" && parsed.subdomain !== "www") {
            siteName = parsed.subdomain;
          }
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
          if (indBreak.cumulative) {
            if (indBreak.isWebsite) {
              websiteTotals.map((ob, index) => {
                if (
                  siteName.length > 0 &&
                  ob.data.url.includes(siteName) &&
                  !(store.getState().break.breakState === "break") &&
                  !(store.getState().break.breakState === "break-feedback") &&
                  !(store.getState().break.breakState === "break-popup") &&
                  !(store.getState().break.breakState === "break-stroop") &&
                  !(store.getState().break.breakState === "break-fruit") &&
                  !(store.getState().break.breakState === "cancel-break") &&
                  !(store.getState().break.breakState === "pre-break-feedback")
                ) {
                  totalUsage = totalUsage + ob.duration;
                }
              });
            } else {
              appTotals.map((ob, index) => {
                if (
                  indBreak.url.length > 0 &&
                  ob.data.app.toLowerCase().includes(indBreak.urltoLowerCase()) &&
                  !(store.getState().break.breakState === "break") &&
                  !(store.getState().break.breakState === "break-feedback") &&
                  !(store.getState().break.breakState === "break-popup") &&
                  !(store.getState().break.breakState === "break-stroop") &&
                  !(store.getState().break.breakState === "break-fruit") &&
                  !(store.getState().break.breakState === "cancel-break") &&
                  !(store.getState().break.breakState === "pre-break-feedback")
                ) {
                  totalUsage = totalUsage + ob.duration;
                }
              });
            }

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
                  breakType: "activity-rule (cumulative)",
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
          } else {
            if (indBreak.isWebsite) {
              let lastVal =
                websiteTotalsUnmerged[websiteTotalsUnmerged.length - 1];
              if (lastVal.data.url.includes(siteName)) {
                for (let i = websiteTotalsUnmerged.length - 1; i > 0; i--) {
                  if (
                    siteName.length > 0 &&
                    websiteTotalsUnmerged[i].data.url.includes(siteName) &&
                    !(store.getState().break.breakState === "break") &&
                    !(store.getState().break.breakState === "break-feedback") &&
                    !(store.getState().break.breakState === "break-popup") &&
                    !(store.getState().break.breakState === "break-stroop") &&
                    !(store.getState().break.breakState === "break-fruit") &&
                    !(store.getState().break.breakState === "cancel-break") &&
                    !(
                      store.getState().break.breakState === "pre-break-feedback"
                    )
                  ) {
                    totalUsage = totalUsage + websiteTotalsUnmerged[i].duration;
                  } else {
                    break;
                  }
                }
                if (lastVal.id !== store.getState().past.takenId) {
                  if (totalUsage / 60 > indBreak.interval && totalUsage > 0) {
                    initScheduled[indBreak.url] += 1;

                    store.dispatch(
                      PastActions.saveInitBreakData(initScheduled)
                    );
                    let timeNow = new Date().toISOString();

                    let breakData = {
                      breakType: "activity-rule (non-cumulative)",
                      breakDescription: indBreak.name,
                      breakDuration: indBreak.breakLength * 60,
                      breakStartTime: timeNow,
                    };
                    store.dispatch(BreakActions.startPopup(timeNow, breakData));
                    store.dispatch(PastActions.setTakenId(lastVal.id));
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
            } else {
              let lastVal = appTotalsUnmerged[websiteTotalsUnmerged.length - 1];
              if (lastVal.data.app.toLowerCase().includes(indBreak.url.toLowerCase())) {
                for (let i = appTotalsUnmerged.length - 1; i > 0; i--) {
                  if (
                    indBreak.url.length > 0 &&
                    appTotalsUnmerged[i].data.app.toLowerCase().includes(indBreak.url.toLowerCase()) &&
                    !(store.getState().break.breakState === "break") &&
                    !(store.getState().break.breakState === "break-feedback") &&
                    !(store.getState().break.breakState === "break-popup") &&
                    !(store.getState().break.breakState === "break-stroop") &&
                    !(store.getState().break.breakState === "break-fruit") &&
                    !(store.getState().break.breakState === "cancel-break") &&
                    !(
                      store.getState().break.breakState === "pre-break-feedback"
                    )
                  ) {
                    totalUsage = totalUsage + appTotalsUnmerged[i].duration;
                  } else {
                    break;
                  }
                }
                if (lastVal.id !== store.getState().past.takenIdApp) {
                  if (totalUsage / 60 > indBreak.interval && totalUsage > 0) {
                    initScheduled[indBreak.url] += 1;

                    store.dispatch(
                      PastActions.saveInitBreakData(initScheduled)
                    );
                    let timeNow = new Date().toISOString();

                    let breakData = {
                      breakType: "activity-rule (non-cumulative)",
                      breakDescription: indBreak.name,
                      breakDuration: indBreak.breakLength * 60,
                      breakStartTime: timeNow,
                    };
                    store.dispatch(BreakActions.startPopup(timeNow, breakData));
                    store.dispatch(PastActions.setTakenIdApp(lastVal.id));
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
          }
        }
      }
    })
    .catch(console.log);
}
