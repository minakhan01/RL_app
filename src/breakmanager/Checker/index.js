import checkActivityRuleBreak from "./activityrule.break";
import checkIntervalBreak from "./interval.break";
import checkScheduledBreak from "./scheduled.break";
import { store } from "../../redux";

//Checks if any of the breaks need to be triggered
export default function checkBreak(history) {
  let user = store.getState().onboarding.user;
  if (user.type === "0" || user.type === "3") {
    checkActivityRuleBreak();
  }
  if (user.type === "0" || user.type === "2") {
    checkIntervalBreak(history);
  }
  if (user.type === "0" || user.type === "1") {
    checkScheduledBreak();
  }
}
