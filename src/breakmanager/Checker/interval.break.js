import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";

export default function checkIntervalBreak()
{
    if (store.getState().past.intervalBreakData.minsAppRunningAfterLastIntervalBreak >= 3) {
        store.dispatch(PastActions.addIntervalBreak())
        if (!(store.getState().break.breakState === "break"))
            store.dispatch(BreakActions.startBreak())
    }
}