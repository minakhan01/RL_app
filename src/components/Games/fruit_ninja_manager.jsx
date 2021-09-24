import { Button } from "antd";
import FruitNinja from "./fruit_ninja";
var s1 = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};
export default function fruitNinjaManager(stage, setStage) {
    var timel=10
    if (stage.fruit == 1)
        return <FruitNinja timelimit={10} version={1} bpi={5} style={s1} onComplete={(score) => { setStage({ ...stage, fruit: 2, scores: [...stage.scores, score] }) }} />;

    if (stage.fruit == 2){
        return <div style={{ ...s1, flexDirection: 'column' }}>
            <div>Score is {stage.scores[stage.scores.length - 1]}. The time limit of Fruit Ninja is {timel} seconds</div>
            <Button onClick={() => setStage({ ...stage, fruit: 3 })}>Next level</Button>
        </div>
    }

    if (stage.fruit == 3)
        return <FruitNinja timelimit={10} version={2} bpi={4} style={s1} onComplete={(score) => { setStage({ ...stage, fruit:4, scores: [...stage.scores, score] }) }} />;

    if (stage.fruit == 4)
    {
        return <div style={{ ...s1, flexDirection: 'column' }}>
            <div>Score is {stage.scores[stage.scores.length - 1]}. The time limit of Fruit Ninja is {timel} seconds</div>
            <Button onClick={() => setStage({ ...stage, fruit: 5 })}>Next level</Button>
        </div>
    }
    if (stage.fruit == 5)
        return <FruitNinja timelimit={10} version={2} bpi={3} style={s1} onComplete={(score) => { setStage({ ...stage, stage: stage.stage + 1, scores: [...stage.scores, score] }) }} />;

}
