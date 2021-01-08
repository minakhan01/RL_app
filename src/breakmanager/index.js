import eventHandler from './EventHandler'
import databaseUpdater from './DatabaseUpdater'
import checkBreak from './Checker'
import { store } from "../redux";

let BreakManager = (history) => {
    store.subscribe(() => eventHandler(history))
    setInterval(() => { checkBreak(history) }, 10000)
    setInterval(() => { databaseUpdater() }, 60000)
}

export default BreakManager