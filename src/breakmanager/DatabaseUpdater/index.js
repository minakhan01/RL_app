import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services"
let client = new AWClientService()


export default function updateDatabase()
{
    client.getActiveWindows().then((dat) => {
        let back = {
            type: "active-windows",
            data: dat,
        }
        store.dispatch(PastActions.backupAWData(back))
    })
    client.getAppTotalWithAudio().then((dat) => {
        let back = {
            type: "screen-time",
            data: dat,
        }
        store.dispatch(PastActions.backupAWData(back))
    })


    store.dispatch(PastActions.addMinute())
}