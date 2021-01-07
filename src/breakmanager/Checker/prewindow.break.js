import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

export default function checkPreWindow() {
    if (store.getState().past.intervalBreakData.minsAppRunningAfterLastIntervalBreak >= 3) {
    }
}