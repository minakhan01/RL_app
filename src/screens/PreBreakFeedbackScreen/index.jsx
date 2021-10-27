import React, { useState } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const PreBreakFeedbackScreen = (props) => {
  const [username, setUsername] = useState("");
  const [rate, setRate] = useState(0);
  const [selected, setSelected] = useState([]);
  const history = useHistory();
  const number_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let mounted = true;

  const panas_emotions = [
    "Interested",
    "Distressed",
    "Excited",
    "Upset",
    "Strong",
    "Determined",
    "Guilty",
    "Scared",
    "Hostile",
    "Enthusiastic",
    "Proud",
    "Attentive",
    "Jittery",
    "Irritable",
    "Alert",
    "Ashamed",
    "Inspired",
    "Nervous",
    "Afraid",
    "Active",
  ];

  let getImageButton = (points, rate, setRate, mounted) => {
    if (points == rate)
      return (
        <div
          style={{
            margin: "1%",
          }}
        >
          <div>
            <button
              style={{ backgroundColor: "white", border: 0, outline: "none" }}
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
    else
      return (
        <div
          style={{
            margin: "1%",
          }}
        >
          <div>
            <button
              style={{ backgroundColor: "white", border: 0, outline: "none" }}
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px", opacity: "0.5" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
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
      <p>How was your working session?</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {number_array.map((item, index) => {
          return getImageButton(item + 1, rate, setRate, mounted);
        })}
      </div>
      <div className="feedback-request-text" style={{ marginTop: "1%" }}>
        How do you feel now (before the break)?
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginRight: "15%",
          marginLeft: "15%",
          justifyContent: "center",
          marginBottom: "3%",
        }}
      >
        {panas_emotions.map((item, index) => {
          return (
            <Button
              onClick={() => {
                let tempSelected = [...selected];
                if (tempSelected.includes(item.toString())) {
                  let tempIndex = tempSelected.indexOf(item.toString());
                  tempSelected.splice(tempIndex, 1);
                } else {
                  tempSelected.push(item.toString());
                }
                setSelected(tempSelected);
              }}
              style={{
                margin: "2px",
                backgroundColor: selected.includes(item.toString())
                  ? "green"
                  : "white",
                color: selected.includes(item.toString()) ? "white" : "black",
                border: 0,
                outline: "none",
              }}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <TextArea
        placeholder="How was your working session"
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
          props.setPreBreakFeedback(rate, username, selected);
          props.startStroop();
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
      setPreBreakFeedback: BreakActions.setPreBreakFeedback,
      startStroop: BreakActions.startStroop,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreBreakFeedbackScreen);
