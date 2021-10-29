import { Button } from "antd";
import CPTScreen from "../../screens/CPTScreen";
var s1 = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function fruitNinjaManager(stage, setStage) {
  return (
    <CPTScreen
      timelimit={10}
      version={1}
      bpi={5}
      style={s1}
      onComplete={(score) => {
        setStage({
          ...stage,
          stage: stage.stage + 1,
          scores: [...stage.scores, score],
        });
      }}
    />
  );
}
