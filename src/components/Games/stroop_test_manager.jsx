import { Button } from "antd";
import StroopTest from "./stroop_test";
var s1 = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function stroopTestManager(stage, setStage) {
  if (stage.stroop == 1)
    return (
      <StroopTest
        len={4}
        style={s1}
        onComplete={(score) => {
          setStage({
            ...stage,
            stroop: 2,
            scores: {
              ...stage.scores,
              stroop: [...stage.scores.stroop, score],
            },
          });
        }}
      />
    );

  if (stage.stroop == 2) {
    return (
      <div style={{ ...s1, flexDirection: "column" }}>
        <div style={{ fontSize: "18px" }}>
          Score is {stage.scores.stroop[stage.scores.stroop.length - 1].score}
        </div>
        <Button onClick={() => setStage({ ...stage, stroop: 3 })}>
          Next level
        </Button>
      </div>
    );
  }

  if (stage.stroop == 3)
    return (
      <StroopTest
        len={6}
        style={s1}
        onComplete={(score) => {
          setStage({
            ...stage,
            stroop: 4,
            scores: {
              ...stage.scores,
              stroop: [...stage.scores.stroop, score],
            },
          });
        }}
      />
    );

  if (stage.stroop == 4) {
    return (
      <div style={{ ...s1, flexDirection: "column" }}>
        <div style={{ fontSize: "18px" }}>
          Score is {stage.scores.stroop[stage.scores.stroop.length - 1].score}
        </div>
        <Button onClick={() => setStage({ ...stage, stroop: 5 })}>
          Next level
        </Button>
      </div>
    );
  }

  if (stage.stroop == 5)
    return (
      <StroopTest
        len={8}
        style={s1}
        onComplete={(score) => {
          setStage({
            ...stage,
            stage: stage.stage + 1,
            scores: {
              ...stage.scores,
              stroop: [...stage.scores.stroop, score],
            },
          });
        }}
      />
    );
}
