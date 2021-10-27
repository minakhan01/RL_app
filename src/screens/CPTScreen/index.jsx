import React, { useState, useEffect } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Experiment, jsPsych } from "jspsych-react";

const { TextArea } = Input;

const CPTScreen = (props) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState(false);
  const history = useHistory();

  const params = [
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AX",
    "AY",
    "AY",
    "AY",
    "AY",
    "BX",
    "BX",
    "BX",
    "BX",
    "BY",
    "BY",
  ];

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

  useEffect(() => {
    // let shuf = shuffleArray(params);
    // setUsername(shuf);
    let keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: trial.choices,
      rt_method: "date",
      persist: false,
      allow_held_key: false,
    });
  }, []);

  jsPsych.pluginAPI.registerPreload("image-keyboard-response");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "5%",
      }}
    >
      {/* {username.map((item,index)=>{

        })} */}
      <Button>Click</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ cancelBreak: BreakActions.cancelBreak }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CPTScreen);
