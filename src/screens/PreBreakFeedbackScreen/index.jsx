import React, { useState } from "react";
import { BreakActions } from "../../redux/actions";
import { Button, Input, Modal, Checkbox } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const PreBreakFeedbackScreen = (props) => {
  const [username, setUsername] = useState("");
  const [rate, setRate] = useState(0);
  const [selected, setSelected] = useState([]);
  const [modalVisible, setModalVisible] = useState(null);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const history = useHistory();
  const number_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      <Modal
        width={"700px"}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h2 style={{ textAlign: "center" }}>{currentlySelected}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <p style={{ flex: 1 }}>Very Slightly or Not at all</p>
            <p style={{ flex: 1 }}>A Little</p>
            <p style={{ flex: 1 }}>Moderately</p>
            <p style={{ flex: 1 }}>Quite a Bit</p>
            <p style={{ flex: 1 }}>Extremely</p>
          </div>
          <div>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempSelected = { ...selected };
                  if (
                    tempSelected[currentlySelected] &&
                    tempSelected[currentlySelected] === 1
                  ) {
                    tempSelected[currentlySelected] = 0;
                  } else {
                    tempSelected[currentlySelected] = 1;
                  }
                  setSelected(tempSelected);
                }}
                checked={
                  selected[currentlySelected] &&
                  selected[currentlySelected] === 1
                    ? true
                    : false
                }
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempSelected = { ...selected };
                  if (
                    tempSelected[currentlySelected] &&
                    tempSelected[currentlySelected] === 2
                  ) {
                    tempSelected[currentlySelected] = 0;
                  } else {
                    tempSelected[currentlySelected] = 2;
                  }
                  setSelected(tempSelected);
                }}
                checked={
                  selected[currentlySelected] &&
                  selected[currentlySelected] === 2
                    ? true
                    : false
                }
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempSelected = { ...selected };
                  if (
                    tempSelected[currentlySelected] &&
                    tempSelected[currentlySelected] === 3
                  ) {
                    tempSelected[currentlySelected] = 0;
                  } else {
                    tempSelected[currentlySelected] = 3;
                  }
                  setSelected(tempSelected);
                }}
                checked={
                  selected[currentlySelected] &&
                  selected[currentlySelected] === 3
                    ? true
                    : false
                }
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempSelected = { ...selected };
                  if (
                    tempSelected[currentlySelected] &&
                    tempSelected[currentlySelected] === 4
                  ) {
                    tempSelected[currentlySelected] = 0;
                  } else {
                    tempSelected[currentlySelected] = 4;
                  }
                  setSelected(tempSelected);
                }}
                checked={
                  selected[currentlySelected] &&
                  selected[currentlySelected] === 4
                    ? true
                    : false
                }
              />
              <Checkbox
                style={{ flex: 1 }}
                onChange={(e) => {
                  let tempSelected = { ...selected };
                  if (
                    tempSelected[currentlySelected] &&
                    tempSelected[currentlySelected] === 5
                  ) {
                    tempSelected[currentlySelected] = 0;
                  } else {
                    tempSelected[currentlySelected] = 5;
                  }
                  setSelected(tempSelected);
                }}
                checked={
                  selected[currentlySelected] &&
                  selected[currentlySelected] === 5
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div>
      </Modal>
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
                setCurrentlySelected(item.toString());
                setModalVisible(true);
              }}
              style={{
                margin: "2px",
                backgroundColor:
                  selected[item.toString()] && selected[item.toString()] !== 0
                    ? "green"
                    : "white",
                color:
                  selected[item.toString()] && selected[item.toString()] !== 0
                    ? "white"
                    : "black",
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
