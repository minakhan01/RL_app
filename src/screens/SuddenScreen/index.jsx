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
  const [password, setPassword] = useState("10");
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
        style={{ borderRadius: "8px" }}
        rows={4}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div style={{ marginTop: "1%", marginBottom: "3%", width: "100%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          How long would you like to take a break for?
        </p>
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            size="large"
            style={{ width: "10%", borderRadius: 5, verticalAlign: "center" }}
            placeholder="Length"
            type="number"
            value={password}
            onChange={(e) => {
              if (e.target.value > 0) setPassword(e.target.value);
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          if (username.length === 0 || password.length === 0) {
            message.error("Please fill in both the fields!");
          } else {
            let timeNow = new Date().toISOString();
            let breakData = {
              breakType: "adhoc",
              breakDescription: "adhoc",
              breakDuration: parseInt(password) * 60,
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
