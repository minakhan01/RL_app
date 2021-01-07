import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import { store } from "../../redux";

import Timer from '../../components/Timer'
import { useDispatch, useSelector } from 'react-redux'
import { BreakActions, PastActions } from "../../redux/actions";

import s1 from'../../assets/s1.png';
import s2 from'../../assets/s2.png';
import s3 from'../../assets/s3.png';
import s4 from'../../assets/s4.png';
import s5 from'../../assets/s5.png';

import s1y from '../../assets/s1y.png';
import s2y from '../../assets/s2y.png';
import s3y from '../../assets/s3y.png';
import s4y from '../../assets/s4y.png';
import s5y from '../../assets/s5y.png';


const BreakScreen = () => {
  const breakState=useSelector(state => state.break.breakState)
  const dispatch = useDispatch();

  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

    const breakDuration = store.getState().break.breakDuration
    const breakStartTime = store.getState().break.breakStartTime

  if(breakState==="break")
    return <div className="break-div">
        <button className="close-break" onClick={() => { dispatch(BreakActions.endBreak()) }}>
        &#10006;
      </button>
      <div className="break-text">
        Be kind!
      </div>
        <div className="countdown-timer">
            {Timer(breakDuration, breakStartTime)}  
      </div>
    </div>;

  else if(breakState==="break-min")
    return <div className="break-div">
        <button className="close-break" onClick={() => { dispatch(BreakActions.endBreak()) }}>
        &#10006;
      </button>
      <div className="break-text">
        Be kind!
      </div>
    </div>;
  
  else
    return <div className="break-div">
        <button className="close-break" onClick={() => {
            let dat = {
                ...store.getState().break, breakEndTime: new Date().toISOString(), rating: rate, notes: feedbackText
            }
            delete dat.breakState;
            delete dat.windowChanged;
            dispatch(PastActions.saveBreakData(dat))
            dispatch(BreakActions.closeBreakScreen())
        }}>
            <div>
                &#10006;
                </div>
            <div className='save-button-text'>
                Save feedback and close
            </div>
      </button>
      <div className="break-completed-text">
            Break completed successfully!
      </div>

      <div className='feedback-text-box'>
            <div className='floating-label' >Notes</div>
            <textarea onChange={(event) => setFeedbackText(event.target.value)} data-role="none" rows="3" cols="80" placeholder="Type in here any notes or reflections about the break that you would like to save" className='feedback-text' />
      </div>

      <div className="feedback-request-text">
        How was this break?
      </div>

      <div className="break-feedback">
          {getImageButton(s5,s5y,1,rate, setRate)}
          {getImageButton(s4,s4y,2,rate, setRate)}
          {getImageButton(s3,s3y,3,rate, setRate)}
          {getImageButton(s2,s2y,4,rate, setRate)}
          {getImageButton(s1,s1y,5,rate, setRate)}
      </div>



    </div>;    
  return null
};

let getImageButton=(name, name2, points, rate, setRate)=>{

if(points==rate)
    return <div className="responsive">
        <div className="gallery">
            <button className='feedback-button' onClick={() => setRate(points)}>
          <img src={name2} alt="Mountains" width="85" height="85"></img>
        </button>
      </div>
    </div>
else
    return <div className="responsive">
        <div className="gallery">
            <button className='feedback-button' onClick={() => setRate(points)}>
          <img src={name} alt="Mountains" width="85" height="85"></img>
        </button>
      </div>
    </div>

}

 export default BreakScreen;


