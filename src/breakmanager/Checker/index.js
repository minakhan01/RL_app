import checkActivityRuleBreak from "./activityrule.break";
import checkIntervalBreak from "./interval.break";
import checkScheduledBreak from "./scheduled.break";
import { store } from "../../redux";
import { AWClientService } from "../../services";
let client = new AWClientService();

//Checks if any of the breaks need to be triggered
export default function checkBreak(history) {
  let user = store.getState().onboarding.user;
  let timeNow = new Date();
  let pastTime = new Date(store.getState().onboarding.timestamp);
  const diffTime = Math.abs(timeNow - pastTime);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 28) { 
    if (user.type === "0" || user.type === "3") {
      checkActivityRuleBreak();
    }
    if (user.type === "0" || user.type === "2") {
      checkIntervalBreak(history);
    }
    if (user.type === "0" || user.type === "1") {
      checkScheduledBreak();
    }

    client
      .getAppTotals()
      .then((allValues) => {
        if (
          !(store.getState().break.breakState === "break") &&
          !(
            store.getState().break.breakState === "break-feedback"
          ) &&
          !(store.getState().break.breakState === "break-popup") &&
          !(store.getState().break.breakState === "break-stroop") &&
          !(store.getState().break.breakState === "break-fruit") &&
          !(store.getState().break.breakState === "cancel-break") &&
          !(
            store.getState().break.breakState ===
            "pre-break-feedback"
          )
        ) {
          if(allValues.should_error){
            history.push("/aww")
          }
        }
      })
  }
}
