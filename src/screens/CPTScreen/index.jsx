import React, { useState, useEffect } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const CPTScreen = (props) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState(false);
  const [wait, setwait] = useState(false);
  const history = useHistory();
  const [keyPressed, setKeyPressed] = useState(false);
  const [tempTrial, setTempTrial] = useState({});
  const [allTrials, setAllTrial] = useState([]);
  const target = "z";
  const non_target = "m";

  const params = [
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AX",
    // "AY",
    "AY",
    "AY",
    "AY",
    // "BX",
    "BX",
    "BX",
    "BX",
    "BY",
    "BY",
  ];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  const runStuff = async (fin) => {
    for await (let trial of fin) {
      let times = [];
      let expected = "non_target";
      if (trial.includes("A") && trial.includes("X")) {
        expected = "target";
      }
      let i = 0;
      for await (let stringVal of trial) {
        let tempObj = {};
        if (i === 3) {
          let now = new Date();
          tempObj["startTime"] = now;
          tempObj["expected"] = expected;
        }
        setPassword(stringVal);
        window.onkeydown = function ({ key }) {
          if (key === target) {
            tempObj["pressed"] = "target";
            let now = new Date();
            tempObj["endTime"] = now;
          } else if (key === non_target) {
            tempObj["pressed"] = "non_target";
            let now = new Date();
            tempObj["endTime"] = now;
          }
        };
        await sleep(500);
        setPassword("");
        if (i === 3 && tempObj["endTime"] > tempObj["startTime"]) {
          tempObj["correct"] = tempObj["pressed"] === tempObj["expected"];
        } else if (i === 3) {
          tempObj["pressed"] = "none";
          tempObj["correct"] = 0;
        }
        await sleep(500);
        if (i === 3) {
          tempObj["pattern"] = trial[1] + trial[3];
          let tempArray = allTrials;
          tempArray.push(tempObj);
          setAllTrial(tempArray);
        }
        i = i + 1;
      }
    }
    await sleep(1000);
    props.onComplete(allTrials)
  };

  useEffect(() => {
    let shuf = shuffleArray(params);
    let fin = [];
    for (let item of shuf) {
      let temp = ["+"];
      temp.push(item[0]);
      temp.push("+");
      temp.push(item[1]);
      fin.push(temp);
    }
    setUsername(fin);
    runStuff(fin);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "5%",
        height: "650px",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: "100px", margin: "0" }}>{password}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ cancelBreak: BreakActions.cancelBreak }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CPTScreen);
