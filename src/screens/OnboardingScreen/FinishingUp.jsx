import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";

import "./styles.css";

const FinishingUpScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);

  return (
    <div className="step-container">
      <h1>You're Almost Done!</h1>
      <div style={{ marginTop: "3%", width: "70%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          Thanks for your input! Based on your preferences, we have created a
          schedule as shown below
          <br />
          <br />
        </p>
        {/* <div style={{ width: "100%" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Scheduled Breaks :{" "}
          </p>
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
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Regular Breaks :{" "}
          </p>
          <p>
            How often you want to take regular breaks :{" "}
            {props.onboarding.regularBreakInterval} hour(s)
          </p>
          <p>
            How long you want these breaks to be :{" "}
            {props.onboarding.regularBreakLength} minute(s)
          </p>
        </div> */}
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Activity Based Breaks :{" "}
          </p>

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
        <p style={{ fontSize: "18px", marginBottom: "5%" }}>
          If you want to make any changes, click on the back button and change
          your settings. You can always come back and make edits to your
          schedule and overrides in 'My Settings'.
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinishingUpScreen);
