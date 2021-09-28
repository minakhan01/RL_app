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
export default function PushInfo(props) {
  let dispatch = useDispatch();
  return (
    <div style={{ ...s1, flexDirection: "column" }}>
      <div>Scores are respectively {JSON.stringify(props.stage.scores)}</div>
      <Button
        onClick={() => {
          remote.getCurrentWindow().reload();
        //   remote.cur
        //   window.relo()
          dispatch(BreakActions.startBreak());
        }}
      >
        Take Break
      </Button>
    </div>
  );
}
