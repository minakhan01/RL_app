import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

export default function checkIntervalBreak()
{
    if (store.getState().past.intervalBreakData.minsAppRunningAfterLastIntervalBreak >= 0) {
        store.dispatch(PastActions.addIntervalBreak())
        if (!(store.getState().break.breakState === "break") && !(store.getState().break.breakState === "break-feedback")) {
            let breakData = {
                breakType: 'interval',
                breakDescription: 'NA',
                breakStartTime: new Date().toISOString(),
                breakDuration: 80,
            }

            store.dispatch(BreakActions.startBreak(breakData))
            console.log("Starting interval break")
        }
    }
}