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
  useEffect(() => {
    // var ob = {
    //     user: store.getState().userdata._id,
    //     time: new Date().toISOString(),
    //     fruit_ninja_scores: props.stage.scores.slice(0, 3),
    //     stroop_test_scores: props.stage.scores.slice(3),
    //     order: props.prp.order,
    // }
    // if (props.prp.order == 1) {
    //     var tmp = ob.fruit_ninja_scores
    //     ob.fruit_ninja_scores = ob.stroop_test_scores
    //     ob.stroop_test_scores = tmp
    // }
    // console.log('pushing' + JSON.stringify(ob))
    // axios.post('https://thepallab.com/api/games/store', ob).then(response => { console.log('success1' + JSON.stringify(response)) }).catch((err) => {
    //     console.log('err1' + JSON.stringify(err))
    //     store.dispatch(queueUserData(ob))
    // })
  });
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
