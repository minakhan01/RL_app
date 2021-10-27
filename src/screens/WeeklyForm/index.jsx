import React, { useState, useEffect } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, Checkbox } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const WeeklyForm = (props) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState(false);
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
          <div style={{ width: "100%", marginTop: "2%" }}>
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
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
              <Checkbox style={{ flex: 1 }} />
            </div>
          </div>
        );
      })}
      <Button>Done</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ cancelBreak: BreakActions.cancelBreak }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyForm);
