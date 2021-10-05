import { BreakActions, PastActions } from "../../redux/actions";
import { store } from "../../redux";
import { AWClientService } from "../../services";
import axios from "axios";
let client = new AWClientService();

//TO-DO: Modify functions according to which data to backup. Currenly backing up active windows

//updates the local database with data from activity watch, and adds a minute of runnning time to THIS APP for use for interval-break
export default function updateDatabase() {
  // client.getActiveWindowsSinceBeginning().then((dat) => {
  //   let back = {
  //     type: "active-windows",
  //     data: dat,
  //   }
  //   store.dispatch(PastActions.backupAWData(back))
  // })

  //Also backing up today's total screen time per app, although unnecessary
  client.getAppTotals().then(async (dat) => {
    let all = dat.appTotal;
    let web = dat.websiteTotals;
    let complete = false;
    
    let i = 0;
    while (!complete) {
      let finAll = [];
      let finWeb = [];
      let start = false;
      if (all[i]) {
        finAll = all.slice(i, i + 50);
      } 
      if (web[i]) {
        finWeb = web.slice(i, i + 50);
      } 
      if (i === 0) {
        start = true;
      }
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      let tomorrow = new Date();
      tomorrow.setHours(23, 59, 59, 999);
      let body = {
        user: store.getState().onboarding.user._id,
        appTotal: finAll,
        websiteTotals: finWeb,
        start,
        today: today,
        tomorrow: tomorrow,
        timestamp: new Date(),
      };
      let response = await axios.post(
        "https://thepallab.com/api/user/aw",
        body
      );
      i += 50;
      if (!all[i] && !web[i]) {
        complete = true;
      }
    }

    // console.log("data", dat);
    // let back = {
    //   type: "screen-time",
    //   data: dat,
    // }
    //
  });

  //adding a minute of running time
  store.dispatch(PastActions.addMinute());
}
