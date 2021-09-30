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
    let all = store.getState().past.totalUploaded;
    let web = store.getState().past.webUploaded;
    let tod = new Date();
    if (store.getState().past.todayaW.length > 0) {
      tod = new Date(store.getState().past.todayaW);
    }
    let actTod = new Date();
    if (
      tod.getDate() === actTod.getDate() &&
      tod.getMonth() === actTod.getMonth()
    ) {
      let finAll = [];
      let tempAll = dat.appTotal;
      let newAll = tempAll.length;
      let finWeb = [];
      let tempWeb = dat.websiteTotals;
      let newWeb = tempWeb.length;
      if (all !== 0) {
        finAll = tempAll.slice(all, all + tempAll.length);
      } else {
        finAll = tempAll;
      }
      if (web !== 0) {
        finWeb = tempWeb.slice(web, web + tempWeb.length);
      } else {
        finWeb = tempWeb;
      }
      if (finAll.length > 0 || finWeb.length > 0) {
        store.dispatch(
          PastActions.setAwUpNum(newAll, newWeb, actTod.toISOString())
        );
        let body = {
          user: store.getState().onboarding.user._id,
          appTotal: finAll,
          websiteTotals: finWeb,
        };
        let response = await axios.post(
          "https://thepallab.com/api/user/aw",
          body
        );
      }
    } else {
      all = 0;
      web = 0;
      let finAll = [];
      let tempAll = dat.appTotal;
      let newAll = tempAll.length;
      let finWeb = [];
      let tempWeb = dat.websiteTotals;
      let newWeb = tempWeb.length;
      if (all !== 0) {
        finAll = tempAll.slice(all, all + tempAll.length);
      } else {
        finAll = tempAll;
      }
      if (web !== 0) {
        finWeb = tempWeb.slice(web, web + tempWeb.length);
      } else {
        finWeb = tempWeb;
      }
      if (finAll.length > 0 || finWeb.length > 0) {
        store.dispatch(
          PastActions.setAwUpNum(newAll, newWeb, actTod.toISOString())
        );
        let body = {
          user: store.getState().onboarding.user._id,
          appTotal: finAll,
          websiteTotals: finWeb,
        };
        let response = await axios.post(
          "https://thepallab.com/api/user/aw",
          body
        );
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
