import React, { useState } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const CancelScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async () => {
    let breakState = props.break;
    let body = {
      prebreakScores: breakState.prebreakScores,
      postbreakScores: breakState.postbreakScores,
      startTime: breakState.breakStartTime,
      endTime: new Date(),
      type: breakState.breakType,
      panas: [],
      user: props.onboarding.user._id,
      cancelReason: username,
      cancelImprovement: password,
      status: "Cancelled",
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/break",
      body
    );
    if (response.data.message === "Successful Added") {
      props.cancelBreak();
      history.push("/home");
    }
  };
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
      <p>Why did you cancel the break?</p>

      <TextArea
        placeholder="Type your reason..."
        style={{ marginBottom: "3%", borderRadius: "8px" }}
        rows={4}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <p>How can we improve in the future?</p>
      <TextArea
        placeholder="Type your response..."
        style={{ borderRadius: "8px" }}
        value={password}
        rows={4}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          if (username.length === 0 || password.length === 0) {
            message.error("Please fill both answers");
          } else {
            loginUser();
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
  bindActionCreators({ cancelBreak: BreakActions.cancelBreak }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CancelScreen);
