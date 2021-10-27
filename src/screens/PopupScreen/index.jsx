import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { BreakActions, PastActions } from "../../redux/actions";
import { Button } from "antd";
import { store } from "../../redux";
import { useHistory } from "react-router-dom";

//TO-DO: add style
const PopupScreen = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  return (
    <div style={{ backgroundColor: "white", padding: "3%" }}>
      <div
        style={{
          color: "#7DCAB6",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        It's time to break!
      </div>
      <div style={{ paddingTop: "3%", fontSize: "15px" }}>
        Should we get started? This break will start automatically if you ignore
        this pop up
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "10%",
        }}
      >
        <Button
          onClick={() => {
            let breakInfo = store.getState().break;
            let pastInfo = store.getState().past;
            let endtime = breakInfo.breakEndTime;
            if (breakInfo.breakEndTime.length === 0) {
              endtime = new Date().toISOString();
            }
            let data = {
              endtime: endtime,
              intervalBreakData: pastInfo.intervalBreakData,
              initScheduled: pastInfo.initScheduled,
              breaksTriggered: breakInfo.breaksTriggered,
            };
            dispatch(BreakActions.onCancelBreak(data));
            history.push("/cancel");
          }}
          style={{ color: "#7DCAB6", borderWidth: 0 }}
        >
          CANCEL
        </Button>
        <Button
          onClick={() => {
            // dispatch(BreakActions.startBreak())
            dispatch(BreakActions.startPrebreakfeedback());
            // history.push("/stroop");
          }}
          style={{ color: "#7DCAB6", borderWidth: 0 }}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
export default PopupScreen;
