import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services"
let client = new AWClientService()

//TO DO: CONNECT WITH ACTUAL USER SETTINGS. Currently hardcoded for Facebook continuous usage above 20 seconds 
//TO DO: SIMILAR CHECK FOR CUMULATIVE USAGE

//checks whether activity rule break is to be triggered
export default function checkActivityRuleBreak()
{
  client.getCurrentlyActiveWindow().then(ob => {
    if ((ob.duration > 20) && ob.data.title.includes("Facebook") && !(store.getState().break.breakState === "break") && !(store.getState().break.breakState === "break-feedback") && !(store.getState().break.breakState === "break-popup")) {
      let timeNow = new Date().toISOString()
      store.dispatch(BreakActions.startPopup(timeNow))
      setTimeout(() => {
        let breakData = {
          breakType: 'activity-rule (continuous)',
          breakDescription: 'Facebook',
          breakStartTime: new Date().toISOString(),
          breakDuration: 90,
        }
        if ((store.getState().break.breakState === "break-popup") && (store.getState().break.popupStartTime === timeNow)) {
          store.dispatch(BreakActions.startBreak(breakData))
        }
      }, 10000)
    }
  }).catch(console.log)
}


