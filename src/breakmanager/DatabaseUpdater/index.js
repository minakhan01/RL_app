import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services"
let client = new AWClientService()

//TO-DO: Modify functions according to which data to backup. Currenly backing up active windows

//updates the local database with data from activity watch, and adds a minute of runnning time to THIS APP for use for interval-break
export default function updateDatabase()
{
  client.getActiveWindowsSinceBeginning().then((dat) => {
    let back = {
      type: "active-windows",
      data: dat,
    }
    store.dispatch(PastActions.backupAWData(back))
  })


  //Also backing up today's total screen time per app, although unnecessary
  client.getAppTotals().then((dat) => {
    let back = {
      type: "screen-time",
      data: dat,
    }
    store.dispatch(PastActions.backupAWData(back))
  })

  //adding a minute of running time
  store.dispatch(PastActions.addMinute())
}