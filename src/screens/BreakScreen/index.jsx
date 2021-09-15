import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import { store } from "../../redux";

import Timer from "../../components/Timer";
import ToolBar from "../../components/Toolbar";

import { useDispatch, useSelector } from "react-redux";
import { BreakActions, PastActions } from "../../redux/actions";

import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";
import s4 from "../../assets/s4.png";
import s5 from "../../assets/s5.png";

import s1y from "../../assets/s1y.png";
import s2y from "../../assets/s2y.png";
import s3y from "../../assets/s3y.png";
import s4y from "../../assets/s4y.png";
import s5y from "../../assets/s5y.png";

var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

const BreakScreen = () => {
  let mounted = true;

  useEffect(() => {
    return () => {
      mounted = false;
    };
  });

  const breakState = useSelector((state) => state.break.breakState);
  const dispatch = useDispatch();

  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [minimized, setMinimized] = useState(false);

  const breakDuration = store.getState().break.breakDuration;
  const breakStartTime = store.getState().break.breakStartTime;

  if (breakState === "break" && !minimized) {
    curWindow.maximize();
    curWindow.setMovable(false);
    curWindow.setSize(
      electron.remote.screen.getPrimaryDisplay().size.width,
      Math.ceil(electron.remote.screen.getPrimaryDisplay().size.height)
    );
    curWindow.setPosition(0, 0);

    return (
      <div className="break-div">
        <ToolBar
          type="minimize"
          minimize={setMinimized}
          totaltime={breakDuration}
          startTime={breakStartTime}
        />
        <div className="circle"></div>
        <div className="break-text">
          {store.getState().onboarding.breakMessage}
        </div>
      </div>
    );
  } else if (breakState === "break" && minimized) {
    curWindow.unmaximize();
    curWindow.setMovable(true);
    curWindow.setSize(
      electron.remote.screen.getPrimaryDisplay().size.width,
      Math.ceil(electron.remote.screen.getPrimaryDisplay().size.height / 8)
    );
    curWindow.setPosition(
      0,
      (7 / 8) * electron.remote.screen.getPrimaryDisplay().size.height
    );

    return (
      <div className="break-div">
        <ToolBar
          type="maximize"
          minimize={setMinimized}
          totaltime={breakDuration}
          startTime={breakStartTime}
          message={"Be kind!"}
        />
      </div>
    );
  } else {
    curWindow.maximize();

    return (
      <div className="break-div">
        <button
          className="close-break"
          onClick={() => {
            let dat = {
              ...store.getState().break,
              breakEndTime: new Date().toISOString(),
              rating: rate,
              notes: feedbackText,
            };
            delete dat.breakState;
            delete dat.windowChanged;
            dispatch(PastActions.saveBreakData(dat));
            dispatch(BreakActions.closeBreakScreen());
          }}
        >
          <div>&#10006;</div>
          <div className="save-button-text">Save feedback and close</div>
        </button>
        <div className="break-completed-text">
          Break completed successfully!
        </div>

        <div className="feedback-text-box">
          <div className="floating-label">Notes</div>
          <textarea
            onChange={(event) => {
              if (mounted) setFeedbackText(event.target.value);
            }}
            data-role="none"
            rows="3"
            cols="80"
            placeholder="Type in here any notes or reflections about the break that you would like to save"
            className="feedback-text"
          />
        </div>

        <div className="feedback-request-text">How was this break?</div>

        <div className="break-feedback">
          {getImageButton(s5, s5y, 1, rate, setRate, mounted)}
          {getImageButton(s4, s4y, 2, rate, setRate, mounted)}
          {getImageButton(s3, s3y, 3, rate, setRate, mounted)}
          {getImageButton(s2, s2y, 4, rate, setRate, mounted)}
          {getImageButton(s1, s1y, 5, rate, setRate, mounted)}
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "7vw", textAlign: "left", paddingLeft: "0vw" }}>
            Not Helpful
          </div>
          <div style={{ width: "28vw" }} />
          <div
            style={{ width: "4vw", textAlign: "right", paddingRight: "1vw" }}
          >
            Helpful
          </div>
        </div>
      </div>
    );
  }
  return null;
};

let getImageButton = (name, name2, points, rate, setRate, mounted) => {
  if (points == rate)
    return (
      <div className="responsive">
        <div className="gallery">
          <button
            className="feedback-button"
            onClick={() => {
              if (mounted) setRate(points);
            }}
          >
            <img src={name2} alt="Mountains" width="85" height="85"></img>
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="responsive">
        <div className="gallery">
          <button
            className="feedback-button"
            onClick={() => {
              if (mounted) setRate(points);
            }}
          >
            <img src={name} alt="Mountains" width="85" height="85"></img>
          </button>
        </div>
      </div>
    );
};

export default BreakScreen;
