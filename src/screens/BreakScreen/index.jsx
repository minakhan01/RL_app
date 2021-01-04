import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";


import Timer from '../../components/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { BreakActions } from "../../redux/actions";




const BreakScreen = () => {
  const breakState=useSelector(state => state.break.breakState)
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(breakState)
  if(breakState==="break")
    return <div className="break-div">
      <button className="close-break" onClick={()=>{

        dispatch(BreakActions.endBreak())}
      }>
        &#10006;
      </button>
      <div className="break-text">
        Be kind!
      </div>
      <div className="countdown-timer">
        {Timer(190)}  
      </div>
    </div>;
  
  else
    return <div className="break-div">
      <button className="close-break" onClick={()=>dispatch(BreakActions.closeBreakScreen())}>
        &#10006;
      </button>
      <div className="break-text">
        &#9786;
      </div>

    </div>;    
  return null
};


 export default BreakScreen;


