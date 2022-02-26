import React, { useState, useEffect } from "react";
import { PastActions } from "../../redux/actions";
import { Button, Input, Checkbox, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const WeeklyForm = (props) => {
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [password, setPassword] = useState({});
  const history = useHistory();

  const questions = [
    "I do frequently",
    "I do automatically",
    "I do without having to consciously remember",
    "that makes me feel weird if I do not do it",
    "I do without thinking",
    "would require effort not to do it",
    "that belongs to my (daily, weekly, monthly) routine",
    "I start doing before I realize I'm doing it",
    "I would find hard not to do",
    "I have no need to think about doing",
    "that's typically 'me'",
    "I have been doing for a long time",
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "5%",
      }}
    >
      <h1>Weekly Survey</h1>
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "left" }}>
          Healthy computer breaks is something
        </h3>
      </div>

      {questions.map((item, index) => {
        return (
          <div
            style={{
              width: "100%",
              marginTop: "2%",
              borderColor: "lightgrey",
              borderWidth: 1,
              borderStyle: "solid",
              padding: "2%",
              borderRadius: "5px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>{item}</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ flex: 1 }}>Strongly agree</p>
              <p style={{ flex: 1 }}>Agree</p>
              <p style={{ flex: 1 }}>More or less agree</p>
              <p style={{ flex: 1 }}>Undecided</p>
              <p style={{ flex: 1 }}>More or less disagree</p>
              <p style={{ flex: 1 }}>Disagree</p>
              <p style={{ flex: 1 }}>Strongly disagree</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 0;
                  setPassword(tempPass);
                }}
                checked={password[index] === 0 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 1;
                  setPassword(tempPass);
                }}
                checked={password[index] === 1 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 2;
                  setPassword(tempPass);
                }}
                checked={password[index] === 2 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 3;
                  setPassword(tempPass);
                }}
                checked={password[index] === 3 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 4;
                  setPassword(tempPass);
                }}
                checked={password[index] === 4 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 5;
                  setPassword(tempPass);
                }}
                checked={password[index] === 5 ? true : false}
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempPass = { ...password };
                  tempPass[index] = 6;
                  setPassword(tempPass);
                }}
                checked={password[index] === 6 ? true : false}
              />
            </div>
          </div>
        );
      })}
      <div style={{ width: "80%", marginTop: "1%" }}>
        <p style={{ fontWeight: "bold", fontSize: "17px" }}>
          Was there anything different or special this weekend?( e.g., exam
          week, vacation. )
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
        <p style={{ fontWeight: "bold", fontSize: "17px" }}>
          Did you have a particular goal this week?
        </p>
        <TextArea
          placeholder="Type your response"
          style={{ borderRadius: "8px" }}
          value={passwordOne}
          rows={4}
          onChange={(e) => {
            setPasswordOne(e.target.value);
          }}
        />
      </div>
      <Button
        style={{ marginTop: "2%" }}
        onClick={async () => {
          if (Object.keys(password).length !== 12) {
            message.error("Please fill all the answers");
          } else {
            let tempWeekly = props.onboarding.weekly;
            let tempWeeklyExtra = props.onboarding.weeklyExtra;
            if (tempWeeklyExtra) {
              tempWeeklyExtra.push([username, passwordOne]);
            } else {
              tempWeeklyExtra = [[username, passwordOne]];
            }
            tempWeekly.push(password);
            if (tempWeekly.length === 1) {
              props.AddWeekly(tempWeekly);
              history.push("/");
            } else {
              let body = {
                weekly: tempWeekly,
                user: props.onboarding.user._id,
                weeklyExtra: tempWeeklyExtra,
              };
              let response = await axios.post(
                "https://thepallab.com/api/user/update-onb",
                body
              );
              if (response.data.message === "Successful Update") {
                props.AddWeekly(tempWeekly);
                props.AddWeeklyExtra(tempWeeklyExtra);
                history.push("/home");
              }
            }
          }
        }}
      >
        Done
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, past: state.past, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      AddWeekly: PastActions.AddWeekly,
      AddWeeklyExtra: PastActions.AddWeeklyExtra,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyForm);
