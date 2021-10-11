import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { store } from "../../redux";
import { BreakActions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const { ipcRenderer, remote } = window.require("electron");
var s1 = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function PushInfoEnd(props) {
  let dispatch = useDispatch();
  useEffect(() => {
    let scores = props.stage.scores;
    let fruit = scores.splice(0, 3);
    let stroop = scores;
    dispatch(BreakActions.postbreakScores(stroop, fruit));
  }, []);
  return (
    <div style={{ ...s1, flexDirection: "column" }}>
      <div>Score is {props.stage.scores[props.stage.scores.length - 1]}</div>
      <Button
        onClick={() => {
          //   remote.getCurrentWindow().reload();
          let timeNow = new Date().toISOString();
          dispatch(BreakActions.endBreak(timeNow));
        }}
      >
        End Break
      </Button>
    </div>
  );
}
