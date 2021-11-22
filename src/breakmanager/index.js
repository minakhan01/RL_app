import eventHandler from "./EventHandler";
import databaseUpdater from "./DatabaseUpdater";
import checkBreak from "./Checker";
import weeklyChecker from "./weeklyChecker";
import updateUserInfo from "./updateUserInfo";
import { store } from "../redux";

//manages break triggers and window changes
let BreakManager = (history) => {
  store.subscribe(() => eventHandler(history));
  setInterval(() => {
    checkBreak(history);
  }, 30000);
  setInterval(() => {
    databaseUpdater();
  }, 60000);
  setInterval(() => {
    weeklyChecker();
  }, 3600000);

  setInterval(() => {
    updateUserInfo();
  }, 600000);
};

export default BreakManager;
