import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services"
let client = new AWClientService()


export default function checkActivityRuleBreak()
{
    client.getCurrentlyActiveWindow().then(ob => {
        console.log(ob)
        if ((ob.duration > 20) && ob.data.title.includes("Facebook") && !(store.getState().break.breakState === "break")) {
            store.dispatch(BreakActions.startBreak())
        }
    }).catch(console.log)
}