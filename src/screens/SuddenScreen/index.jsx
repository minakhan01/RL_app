import React, { useState } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const SuddenScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async () => {};
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
      <p>Why did you want to take this break?</p>

      <TextArea
        placeholder="Type your reason..."
        style={{ marginBottom: "3%", borderRadius: "8px" }}
        rows={4}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          if (username.length === 0) {
            message.error("Please fill the answer");
          } else {
            let timeNow = new Date().toISOString();
            let breakData = {
              breakType: "adhoc",
              breakDescription: "adhoc",
              breakDuration: 30 * 60,
              breakStartTime: timeNow,
              suddenReason: username,
            };
            props.addBreakData(breakData);
            props.startPrebreakfeedback();
          }
        }}
      >
        Continue
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addBreakData: BreakActions.addBreakData,
      startStroop: BreakActions.startStroop,
      startPrebreakfeedback: BreakActions.startPrebreakfeedback,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuddenScreen);
