import React from "react";
import FruitNinja from "./fruit_ninja";
import StroopTest from "./stroop_test";
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
function Games(props) {
  var [stage, setStage] = useState({
    stage: 0,
    scores: [],
    fruit: 1,
    stroop: 1,
  });

  /////////////////////////////
  const stageRef = useRef(stage);
  stageRef.current = stage;
  useEffect(() => {
    var lastStage = { stage: 0, scores: [], fruit: 1, stroop: 1 };
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
          if (lastStage.fruit == 2 || lastStage.fruit == 4) {
            setStage((stg) => {
              return { ...stg, fruit: stg.fruit + 1 };
            });
          }
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

  if (stage.stage == 0)
    return (
      <div style={{ ...s1, display: "flex", flexDirection: "column" }}>
        <h3>Welcome!</h3>
        <Button onClick={() => setStage({ ...stage, stage: 1 })}>Start</Button>
      </div>
    );

  if (
    (stage.stage == 1 && props.order == 0) ||
    (stage.stage == 3 && props.order == 1)
  ) {
    return fruitNinjaManager(stage, setStage);
  }

  if (stage.stage == 2) {
    if (props.order == 1) {
      return (
        <div style={{ ...s1, flexDirection: "column" }}>
          <div>Score is {stage.scores[2]}</div>
          <p style={{ textAlign: "center" }}>
            The next game is stroop test. You will be given a list of words that
            are printed in a different color than the meaning of the word. You
            have to choose the name color of the word, not the word itself
          </p>
          <Button onClick={() => setStage({ ...stage, stage: 3 })}>
            Next game
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{ ...s1, flexDirection: "column" }}>
          <div>
            Score is {stage.scores[2]}. The time limit of Fruit Ninja is 10
            seconds
          </div>
          <p style={{ textAlign: "center" }}>
            The next game is stroop test. You will be given a list of words that
            are printed in a different color than the meaning of the word. You
            have to choose the name color of the word, not the word itself
          </p>
          <Button onClick={() => setStage({ ...stage, stage: 3 })}>
            Next game
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
