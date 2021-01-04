import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";


import Timer from '../../components/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { BreakActions } from "../../redux/actions";

import s1 from'../../assets/s1.png';
import s2 from'../../assets/s2.png';
import s3 from'../../assets/s3.png';
import s4 from'../../assets/s4.png';
import s5 from'../../assets/s5.png';



const BreakScreen = () => {
  const breakState=useSelector(state => state.break.breakState)
  const history = useHistory();
  const dispatch = useDispatch();
  setTimeout(()=>dispatch(BreakActions.endBreak()),90000)
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
        {Timer(90)}  
      </div>
    </div>;
  
  else
    return <div className="break-div">
      <button className="close-break" onClick={()=>dispatch(BreakActions.closeBreakScreen())}>
        &#10006;
      </button>
      <div className="break-completed-text">
        Break completed successfully!
      </div>
      <div className="feedback-request-text">
        How did this break make you feel?
      </div>

      <div className="break-feedback">
          {getImageButton(s5)}
          {getImageButton(s4)}
          {getImageButton(s3)}
          {getImageButton(s2)}
          {getImageButton(s1)}
      </div>

    </div>;    
  return null
};

let getImageButton=(name)=>{
return <div class="responsive">
  <div class="gallery">
    <a target="_blank" href="img_mountains.jpg">
      <img src={name} alt="Mountains" width="85" height="85"></img>
    </a>
  </div>
</div>
}

 export default BreakScreen;


