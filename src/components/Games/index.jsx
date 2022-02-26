import React from "react";
import { useState } from "react";
import { Button } from "antd";
import fruitNinjaManager from "./fruit_ninja_manager";
import stroopTestManager from "./stroop_test_manager";
import axios from "axios";
import { store } from "../../redux";
import PushInfo from "./push_info";
import PushInfoEnd from "./push_info_end";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BreakActions } from "../../redux/actions";
const { ipcRenderer, remote } = window.require("electron");
function Games(props) {
  var [stage, setStage] = useState({
    stage: 0,
    scores: {
      stroop: [],
      fruit: [],
    },
    fruit: 1,
    stroop: 1,
  });
  let dispatch = useDispatch();

  /////////////////////////////
  const stageRef = useRef(stage);
  stageRef.current = stage;
  useEffect(() => {
    var lastStage = {
      stage: 0,
      scores: {
        stroop: [],
        fruit: [],
      },
      fruit: 1,
      stroop: 1,
    };
    var lastTime = new Date();
    var intvl;
    var cbf = () => {
      if (new Date() - lastTime > 2000) {
        lastTime = new Date();
        var thisStage = stageRef.current;
        if (
          lastStage.fruit == thisStage.fruit &&
          lastStage.stroop == thisStage.stroop &&
          lastStage.stage == thisStage.stage
        ) {
          // if (lastStage.fruit == 2 || lastStage.fruit == 4) {
          //   setStage((stg) => {
          //     return { ...stg, fruit: stg.fruit + 1 };
          //   });
          // }
          if (lastStage.stroop == 2 || lastStage.stroop == 4) {
            setStage((stg) => {
              return { ...stg, stroop: stg.stroop + 1 };
            });
          }
          // if (lastStage.stage == 2) {
          //   setStage((stg) => {
          //     return { ...stg, stage: 3 };
          //   });
          // }
        }
        lastStage = thisStage;
      }
      intvl = window.requestAnimationFrame(cbf);
    };
    cbf();
    return () => window.cancelAnimationFrame(intvl);
  });

  /////////////////////////////

  var s1 = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (stage.stage == 0) {
    if (props.status === "end") {
      return (
        <div style={{ ...s1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ textAlign: "center" }}>
            Your break is complete. This is a 60 second post-break test to
            evaluate how effective the break was. Please press start to
            continue!
          </h3>
          <Button
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal.push({ cpt: false });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 1 });
            }}
          >
            Start
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal.push({ cpt: true });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 2 });
            }}
          >
            Skip CPT Test
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal.push({ cpt: true, stroop: true });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 4 });
            }}
          >
            Skip both tests
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{ ...s1, display: "flex", flexDirection: "column" }}>
          <h3>Welcome! This is a 60 second pre-break test.</h3>
          <p
            style={{
              textAlign: "center",
              paddingLeft: "5%",
              paddingRight: "5%",
              fontSize: "18px",
            }}
          >
            Your first test is a Continuous Performance Task (CPT). You will see
            letters and symbols flashing. If an A is shown followed by an X, You
            should press 'z' on your keyboard. If the first letter is not an A
            but a B, or the second letter is not an X but a Y, you should press
            the 'm' on your keyboard.
            <br />
            Please note there will be '+' symbols between each letter flashed.
            You are to press the buttons on your keyboard only when either 'X'
            or 'Y' are displayed.
          </p>
          <img src={require("../../assets/cpt.jpg").default} height={"375px"} />
          <Button
            style={{ marginTop: "1%" }}
            onClick={() => {
              let skipVal = [];
              skipVal.push({ cpt: false });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 1 });
            }}
          >
            Start
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = [];
              skipVal.push({ cpt: true });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 2 });
            }}
          >
            Skip CPT Test
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = [];
              skipVal.push({ cpt: true, stroop: true });
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 4 });
            }}
          >
            Skip both tests
          </Button>
        </div>
      );
    }
  }

  if (
    (stage.stage == 1 && props.order == 0) ||
    (stage.stage == 3 && props.order == 1)
  ) {
    return fruitNinjaManager(stage, setStage);
  }

  if (stage.stage == 2) {
    if (props.status === "end") {
      let correct = [];
      if (stage.scores.fruit.length > 0) {
        correct = stage.scores.fruit.filter(function (itm) {
          return itm.correct === true;
        });
      }
      return (
        <div style={{ ...s1, flexDirection: "column" }}>
          {stage.scores.fruit.length > 0 && (
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>
              Score is {correct.length}
            </div>
          )}
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            The next game is stroop test. You will be given a list of words that
            are printed in a different color than the meaning of the word. You
            have to choose the name of the color, not the word itself
          </p>
          <img
            src={require("../../assets/cpt-2.jpg").default}
            height={"375px"}
          />
          <Button
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal[1]["stroop"] = false;
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 3 });
            }}
          >
            Next game
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal[1]["stroop"] = true;
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 4 });
            }}
          >
            Skip Stroop Test
          </Button>
        </div>
      );
    } else {
      let correct = [];
      if (stage.scores.fruit.length > 0) {
        correct = stage.scores.fruit.filter(function (itm) {
          return itm.correct === true;
        });
      }
      return (
        <div style={{ ...s1, flexDirection: "column" }}>
          {stage.scores.fruit.length > 0 && (
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>
              Score is {correct.length}
            </div>
          )}
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            The next game is stroop test. You will be given a list of words that
            are printed in a different color than the meaning of the word. You
            have to choose the name of the color, not the word itself
          </p>
          <img
            src={require("../../assets/cpt-2.jpg").default}
            height={"375px"}
          />
          <Button
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal[0]["stroop"] = false;
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 3 });
            }}
          >
            Next game
          </Button>
          <Button
            style={{ marginTop: "2%" }}
            onClick={() => {
              let skipVal = store.getState().break.skipped;
              skipVal[0]["stroop"] = true;
              dispatch(BreakActions.setSkipped(skipVal));
              setStage({ ...stage, stage: 4 });
            }}
          >
            Skip Stroop Test
          </Button>
        </div>
      );
    }
  }

  if (
    (stage.stage == 3 && props.order == 0) ||
    (stage.stage == 1 && props.order == 1)
  )
    return stroopTestManager(stage, setStage);

  if (stage.stage == 4) {
    if (props.status === "end") {
      return <PushInfoEnd stage={stage} prp={props} />;
    } else {
      return <PushInfo stage={stage} prp={props} />;
    }
  }
  return null;
}

export default Games;
