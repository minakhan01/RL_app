import React, { useState, useEffect } from "react";
import { PastActions } from "../../redux/actions";
import { Button, Input, Checkbox, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "../../redux";

const TakeWeeklyScreen = (props) => {
  const [username, setUsername] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let currWeekly = store.getState().onboarding.weekly;
    let lenVal = currWeekly.length + 1;
    let timeNow = new Date();
    let pastTime = new Date(store.getState().onboarding.timestamp);
    const diffTime = Math.abs(timeNow - pastTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let finalArray = [];
    for (let i = 0; i < lenVal; i++) {
      finalArray.push("done");
    }
    for (let j = lenVal; j < 5; j++) {
      if (diffDays >= j * 7) {
        finalArray.push("unlock");
      } else {
        finalArray.push("noun");
      }
    }
    console.log("final", finalArray);
    setUsername(finalArray);
    setInterval(() => {
      let currWeekly = store.getState().onboarding.weekly;
      let lenVal = currWeekly.length + 1;
      let timeNow = new Date();
      let pastTime = new Date(store.getState().onboarding.timestamp);
      const diffTime = Math.abs(timeNow - pastTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let finalArray = [];
      for (let i = 0; i < lenVal; i++) {
        finalArray.push("done");
      }
      for (let j = lenVal; j < 5; j++) {
        if (diffDays >= j * 7) {
          finalArray.push("unlock");
        } else {
          finalArray.push("noun");
        }
      }
      setUsername(finalArray);
    }, 600000);
  }, []);

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
      <h1>Take Weekly Survey</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <p style={{ margin: "0%" }}>Week 0</p>
        {username[0] === "done" && (
          <Button style={{ width: "120px" }} disabled>
            Already Taken
          </Button>
        )}
        {username[0] === "unlock" && (
          <Button
            style={{ width: "120px" }}
            onClick={() => {
              history.push("/week");
            }}
          >
            Take Now
          </Button>
        )}
        {username[0] === "noun" && (
          <Button style={{ width: "120px" }} disabled>
            Locked
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <p style={{ margin: "0%" }}>Week 1</p>
        {username[1] === "done" && (
          <Button style={{ width: "120px" }} disabled>
            Already Taken
          </Button>
        )}
        {username[1] === "unlock" && (
          <Button
            onClick={() => {
              history.push("/week");
            }}
            style={{ width: "120px" }}
          >
            Take Now
          </Button>
        )}
        {username[1] === "noun" && (
          <Button style={{ width: "120px" }} disabled>
            Locked
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <p style={{ margin: "0%" }}>Week 2</p>
        {username[2] === "done" && (
          <Button style={{ width: "120px" }} disabled>
            Already Taken
          </Button>
        )}
        {username[2] === "unlock" && (
          <Button
            onClick={() => {
              history.push("/week");
            }}
            style={{ width: "120px" }}
          >
            Take Now
          </Button>
        )}
        {username[2] === "noun" && (
          <Button style={{ width: "120px" }} disabled>
            Locked
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <p style={{ margin: "0%" }}>Week 3</p>
        {username[3] === "done" && (
          <Button style={{ width: "120px" }} disabled>
            Already Taken
          </Button>
        )}
        {username[3] === "unlock" && (
          <Button
            onClick={() => {
              history.push("/week");
            }}
            style={{ width: "120px" }}
          >
            Take Now
          </Button>
        )}
        {username[3] === "noun" && (
          <Button style={{ width: "120px" }} disabled>
            Locked
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "30%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <p style={{ margin: "0%" }}>Week 4</p>
        {username[4] === "done" && (
          <Button style={{ width: "120px" }} disabled>
            Already Taken
          </Button>
        )}
        {username[4] === "unlock" && (
          <Button
            onClick={() => {
              history.push("/week");
            }}
            style={{ width: "120px" }}
          >
            Take Now
          </Button>
        )}
        {username[4] === "noun" && (
          <Button style={{ width: "120px" }} disabled>
            Locked
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, past: state.past };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setWeeklyRem: PastActions.setWeeklyRem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TakeWeeklyScreen);
