import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input } from "antd";
import { BreakActions, OnboardingActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./styles.css";
var shell = window.require("electron").shell;
var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

const HomeScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  const [tempMessage, setTempMessage] = useState(props.onboarding.breakMessage);
  const history = useHistory();

  useEffect(() => {
    // checkUpdateApp();
  }, []);

  const loginUser = async (id) => {
    let body = { _id: id };
    let response = await axios.post(
      "https://thepallab.com/api/user/login",
      body
    );
    if (response.data.user) {
      props.loginUserAction(response.data.user);
      props.hardReset();
      curWindow.webContents.reloadIgnoringCache();
    }
  };

  let checkUpdateApp = async () => {
    let body = {
      user: props.onboarding.user._id,
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/updateinfo",
      body
    );
    if (response.data.shouldUpdate) {
      let onbData = response.data.onbInfo;
      let findata = onbData[0];
      delete findata.user;
      props.addOnbInfo(findata);
    }
  };

  return (
    <div className="step-container">
      <div style={{ marginTop: "3%", width: "70%", margin: "5%" }}>
        {(props.onboarding.user.type === "0" ||
          props.onboarding.user.type === "1") && (
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
        )}
        {(props.onboarding.user.type === "0" ||
          props.onboarding.user.type === "2") && (
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
              {Math.floor(parseInt(props.onboarding.regularBreakInterval) / 60)}{" "}
              hour(s) {parseInt(props.onboarding.regularBreakInterval) % 60}{" "}
              minute(s)
            </p>
            <p>
              How long you want these breaks to be :{" "}
              {props.onboarding.regularBreakLength} minute(s)
            </p>
          </div>
        )}
        {(props.onboarding.user.type === "0" ||
          props.onboarding.user.type === "3") && (
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
        )}
        <Button
          onClick={() => {
            history.push("/sud");
          }}
        >
          Take a Break!
        </Button>

        <div style={{ marginTop: "3%" }}>
          <p style={{ fontSize: "18px", marginBottom: "0" }}>Break Message</p>
          {/* <p style={{ fontSize: "15px", color: "#696969", width: "60%" }}>
          You can set up to 10 messages, the messages will appear interchangebly
          on different breaks
        </p> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Input
              size="large"
              style={{
                width: "30%",
                borderRadius: 5,
                verticalAlign: "center",
              }}
              placeholder="Break Message"
              value={tempMessage}
              onChange={(e) => {
                setTempMessage(e.target.value);
              }}
            />
            <Button
              onClick={async () => {
                let body = {
                  breakMessage: tempMessage,
                  user: props.onboarding.user._id,
                };
                let response = await axios.post(
                  "https://thepallab.com/api/user/update-onb",
                  body
                );
                if (response.data.message === "Successful Update") {
                  props.setBreakMessage(tempMessage);
                  history.push("/home");
                }
              }}
              style={{ marginLeft: "1%" }}
            >
              Update Message
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {
            shell.openExternal("https://thepallab.com/feedback");
          }}
          style={{ margin: "2%" }}
        >
          Feedback Form
        </Button>
        <Button
          onClick={() => {
            loginUser(props.onboarding.user._id);
          }}
          style={{ margin: "2%" }}
        >
          Force Refresh
        </Button>
        <Button
          onClick={() => {
            props.resetInfo();
            history.push("/");
          }}
          style={{ margin: "2%" }}
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
      loginUserAction: OnboardingActions.loginUser,
      setBreakMessage: OnboardingActions.setBreakMessage,
      addOnbInfo: OnboardingActions.addOnbInfo,
      hardReset: BreakActions.hardReset,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
