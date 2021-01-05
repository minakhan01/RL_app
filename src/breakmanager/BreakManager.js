import { BreakActions } from "../redux/actions";
import { store } from "../redux";
import { AWClientService } from "../services"
const { ipcRenderer } = window.require('electron')
var electron = window.require('electron');
var curWindow = electron.remote.getCurrentWindow();

let client = new AWClientService()

let breakcheck = () => {
    client.getCurrentlyActiveWindow().then(ob => {
        
        if ((ob.duration > 20) && ob.data.title.includes("Facebook") && !(store.getState().break.breakState === "break")) {        
            store.dispatch(BreakActions.startBreak())            
        }          
    })
  
}
  
let BreakManager=(history)=>{  
  console.log('i am being called1')
  let handleChange = (state => 
    {
        if(state.break.breakState==="no-break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(1)
          curWindow.minimize()
          history.push('/')
          store.dispatch(BreakActions.setWindowChanged())
        }
        else if(state.break.breakState==="break" && !state.break.windowChanged)
        {
          curWindow.setOpacity(0.8)
          curWindow.maximize()
          history.push('/break')
          store.dispatch(BreakActions.setWindowChanged())
            setTimeout(() => {
            if (store.getState().break.breakState==="break")
              store.dispatch(BreakActions.endBreak())
          }, 90000)

        }
      return state.break.breakState
    }
  )
  store.subscribe(()=>handleChange(store.getState()))
  setInterval(()=>{breakcheck()}, 10000)
}

export default BreakManager