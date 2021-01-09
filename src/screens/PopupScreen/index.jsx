import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux'
import { BreakActions, PastActions } from "../../redux/actions";

//TO-DO: add style
const PopupScreen = () => {
  let dispatch = useDispatch()
  return (<div style={{ backgroundColor: 'white' }}>
      <div style={{ backgroundColor: 'white' }}>It's time to break!</div>
      <div style={{ backgroundColor: 'white' }}>Should we get started? This break will start automatically if you ignore this pop up</div>
      <div style={{ backgroundColor: 'white' }}><button onClick={() => dispatch(BreakActions.cancelBreak())}>CANCEL</button><button>CONTINUE</button></div>
    </div>)
}

export default PopupScreen;


