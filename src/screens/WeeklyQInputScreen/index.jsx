import React, { useState } from "react";
import { PastActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const WeeklyQInputScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
      <p>
        Was there anything different or special this weekend?( e.g., exam week,
        vacation. )
      </p>

      <TextArea
        placeholder="Type your response"
        style={{ marginBottom: "3%", borderRadius: "8px" }}
        rows={4}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <p>Did you have a particular goal this week?</p>
      <TextArea
        placeholder="Type your response"
        style={{ borderRadius: "8px" }}
        value={password}
        rows={4}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={async () => {
          let tempWeekly = props.onboarding.weeklyExtra;
          if (tempWeekly) {
            tempWeekly.push([username, password]);
          } else {
            tempWeekly = [[username, password]];
          }

          let body = {
            weeklyExtra: tempWeekly,
            user: props.onboarding.user._id,
          };
          let response = await axios.post(
            "https://thepallab.com/api/user/update-onb",
            body
          );
          if (response.data.message === "Successful Update") {
            props.AddWeeklyExtra(tempWeekly);
            history.push("/week");
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
  bindActionCreators({ AddWeeklyExtra: PastActions.AddWeeklyExtra }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyQInputScreen);
