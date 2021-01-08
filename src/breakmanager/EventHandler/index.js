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

    else if (store.getState().break.breakState === "break-popup" && !store.getState().break.windowChanged) {
        console.log('changing screen')
        curWindow.restore()
        //curWindow.maximize()
        //curWindow.unmaximize()
        curWindow.setSize(400, 300)
        history.push('/popup')
        store.dispatch(BreakActions.setWindowChanged())
    }

    else if (store.getState().break.breakState === "break" && !store.getState().break.windowChanged) {
        curWindow.setOpacity(0.8)
        curWindow.maximize()

        history.push('/break')
        store.dispatch(BreakActions.setWindowChanged())
        let s1 = store.getState().break.breakStartTime
        setTimeout(() => {
            if (store.getState().break.breakState === "break" && s1 === store.getState().break.breakStartTime)
                store.dispatch(BreakActions.endBreak())
        }, store.getState().break.breakDuration*1000)

    }
}


