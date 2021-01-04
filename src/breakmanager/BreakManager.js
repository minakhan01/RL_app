import { BreakActions } from "../redux/actions";
import { store } from "../redux";

const { ipcRenderer } = window.require('electron')
//ipcRenderer.sendSync('set-screen-to-be-shown','break')
var electron = window.require('electron');
var curWindow = electron.remote.getCurrentWindow();


let breakcheck = ()=>{
  store.dispatch(BreakActions.startBreak())
}
  
let BreakManager=()=>{  
  console.log('i am being called1')
  let handleChange = (state => 
    {
        if(state.break.breakState==="no-break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(1)
          curWindow.maximize()
          store.dispatch(BreakActions.setWindowChanged())
        }
        else if(state.break.breakState==="break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(0.8)
          curWindow.maximize()
          store.dispatch(BreakActions.setWindowChanged())
        }
      return state.break.breakState
    }
  )
  store.subscribe(()=>handleChange(store.getState()))
  setTimeout(()=>{breakcheck()}, 10000)
}

export default BreakManager