import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { OnboardingActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import "./styles.css";

const HomeScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  const history = useHistory();

  return (
    <div className="step-container">
      <div style={{ marginTop: "3%", width: "70%", margin: "5%" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Scheduled Breaks :{" "}
            </p>
            <Button
              onClick={() => {
                props.addTempSched(props.onboarding.scheduledBreaks);
                history.push("/edit-sched");
              }}
            >
              Edit Scheduled Breaks
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <p style={{ flex: 1 }}>Day</p>
            <p style={{ flex: 1 }}>Start Time</p>
            <p style={{ flex: 1 }}>End Time</p>
          </div>
          <div>
            {props.onboarding.scheduledBreaks.map((item, index) => {
              if (item.start.length > 0) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "50%",
                      marginTop: index !== 0 ? "1%" : "0%",
                    }}
                  >
                    <p style={{ flex: 1 }}>{item.day}</p>
                    <p style={{ flex: 1 }}>
                      {new Date(item.start).getHours() +
                        ":" +
                        (new Date(item.start).getMinutes() < 10 ? "0" : "") +
                        new Date(item.start).getMinutes()}
                    </p>
                    <p style={{ flex: 1 }}>
                      {new Date(item.end).getHours() +
                        ":" +
                        (new Date(item.end).getMinutes() < 10 ? "0" : "") +
                        new Date(item.end).getMinutes()}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Regular Breaks :{" "}
            </p>
            <Button
              onClick={() => {
                props.addTempReg(
                  props.onboarding.regularBreakLength,
                  props.onboarding.regularBreakInterval
                );
                history.push("/edit-reg");
              }}
            >
              Edit Regular Breaks
            </Button>{" "}
          </div>
          <p>
            How often you want to take regular breaks :{" "}
            {props.onboarding.regularBreakInterval} hour(s)
          </p>
          <p>
            How long you want these breaks to be :{" "}
            {props.onboarding.regularBreakLength} minute(s)
          </p>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Activity Based Breaks :{" "}
            </p>
            <Button
              onClick={() => {
                props.addTempAct(
                  props.onboarding.overRideSites,
                  props.onboarding.allOverRides
                );
                history.push("/edit-act");
              }}
            >
              Edit Activity Based Breaks
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <p style={{ flex: 1 }}>Site</p>
            <p style={{ flex: 1 }}>Break Interval (minutes)</p>
            <p style={{ flex: 1 }}>Break Length (minutes)</p>
          </div>
          <div>
            {props.onboarding.allOverRides.map((item, index) => {
              if (item.name.length > 0) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "50%",
                      marginTop: index !== 0 ? "1%" : "0%",
                    }}
                  >
                    <p style={{ flex: 1 }}>{item.name}</p>
                    <p style={{ flex: 1 }}>{item.interval}</p>
                    <p style={{ flex: 1 }}>{item.breakLength}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <Button
          onClick={() => {
            props.resetInfo();
            history.push("/");
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding, break: state.break };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetInfo: OnboardingActions.reset,
      addTempSched: OnboardingActions.addTempSched,
      addTempReg: OnboardingActions.addTempReg,
      addTempAct: OnboardingActions.addTempAct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
