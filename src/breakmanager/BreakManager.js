import { BreakActions } from "../redux/actions";
import { store } from "../redux";

const { ipcRenderer } = window.require('electron')
var electron = window.require('electron');
var curWindow = electron.remote.getCurrentWindow();


let breakcheck = ()=>{
  store.dispatch(BreakActions.startBreak())
}
  
let BreakManager=(history)=>{  
  console.log('i am being called1')
  let handleChange = (state => 
    {
        if(state.break.breakState==="no-break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(1)
          curWindow.maximize()
          history.push('/')
          store.dispatch(BreakActions.setWindowChanged())
        }
        else if(state.break.breakState==="break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(0.8)
          curWindow.maximize()
          history.push('/break')
          store.dispatch(BreakActions.setWindowChanged())
        }
      return state.break.breakState
    }
  )
  store.subscribe(()=>handleChange(store.getState()))
  setTimeout(()=>{breakcheck()}, 10000)
}

export default BreakManager