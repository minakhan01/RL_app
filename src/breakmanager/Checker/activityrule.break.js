import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services"
let client = new AWClientService()


export default function checkActivityRuleBreak()
{
    client.getCurrentlyActiveWindow().then(ob => {
        if ((ob.duration > 20) && ob.data.title.includes("Facebook") && !(store.getState().break.breakState === "break") && !(store.getState().break.breakState === "break-feedback")) {
            console.log("Starting activity rule break")
            let breakData = {
                breakType: 'activity-rule (continuous)',
                breakDescription: 'Facebook',
                breakStartTime: new Date().toISOString(),
                breakDuration: 90,
            }
            console.log(breakData)
            store.dispatch(BreakActions.startBreak(breakData))
        }
    }).catch(console.log)
}