import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
var electron = window.require('electron');
var curWindow = electron.remote.getCurrentWindow();

export default function eventHandler(history){
    if (store.getState().break.breakState === "no-break" && !store.getState().break.windowChanged) {
        curWindow.setOpacity(1)
        curWindow.minimize()
        history.push('/')
        store.dispatch(BreakActions.setWindowChanged())
    }

    else if (store.getState().break.breakState === "break" && !store.getState().break.windowChanged) {
        curWindow.setOpacity(0.8)
        curWindow.maximize()
        history.push('/break')
        store.dispatch(BreakActions.setWindowChanged())
        setTimeout(() => {
            if (store.getState().break.breakState === "break")
                store.dispatch(BreakActions.endBreak())
        }, 90000)

    }
}
