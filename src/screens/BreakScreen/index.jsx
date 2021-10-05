import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles.css";
import { store } from "../../redux";

import Timer from "../../components/Timer";
import ToolBar from "../../components/Toolbar";

import { useDispatch, useSelector } from "react-redux";
import { BreakActions, PastActions } from "../../redux/actions";

var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

const BreakScreen = (props) => {
  let mounted = true;

  useEffect(() => {
    return () => {
      mounted = false;
    };
  });

  const breakState = useSelector((state) => state.break.breakState);
  const dispatch = useDispatch();

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
  }
  return null;
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding, break: state.break };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BreakScreen);
