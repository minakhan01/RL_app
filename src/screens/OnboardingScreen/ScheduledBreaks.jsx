import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TimePicker } from "antd";
import moment from "moment";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const ScheduledBreakScreen = (props) => {
  return (
    <div className="step-container">
      <h1>Scheduled Breaks</h1>
      <div>
        <p style={{ fontSize: "17px" }}>
          From what time to what time are you in front of this screen?
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <p style={{ flex: 1 }}>Start Time</p>
        <p style={{ flex: 1 }}>End Time</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <TimePicker
          format={"HH:mm"}
          style={{ flex: 1 }}
          value={
            props.onboarding.screenTime.start.length !== 0
              ? moment(props.onboarding.screenTime.start)
              : null
          }
          onChange={(e) => {
            const time = e.toString();
            const tempObject = props.onboarding.screenTime;
            tempObject.start = time;
            props.setScreenTime(tempObject);
          }}
        />
        <TimePicker
          format={"HH:mm"}
          style={{ flex: 1 }}
          value={
            props.onboarding.screenTime.end.length !== 0
              ? moment(props.onboarding.screenTime.end)
              : null
          }
          onChange={(e) => {
            const time = e.toString();
            const tempObject = props.onboarding.screenTime;
            tempObject.end = time;
            props.setScreenTime(tempObject);
          }}
        />
      </div>

      <div style={{ marginTop: "4%" }}>
        <p style={{ fontSize: "17px" }}>
          Are there any breaks you would like to schedule on a regular basis?
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <p style={{ flex: 1 }}>Start Time</p>
        <p style={{ flex: 1 }}>End Time</p>
      </div>
      <div>
        {props.onboarding.scheduledBreaks.map((item, index) => {
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
              <TimePicker
                format={"HH:mm"}
                style={{ flex: 1 }}
                value={item.start.length !== 0 ? moment(item.start) : null}
                onChange={(e) => {
                  const time = e.toString();
                  const tempObject = item;
                  tempObject.start = time;
                  const tempArray = props.onboarding.scheduledBreaks;
                  tempArray[index] = tempObject;
                  props.setScheduledBreaks(tempArray);
                }}
              />
              <TimePicker
                format={"HH:mm"}
                style={{ flex: 1 }}
                value={item.end.length !== 0 ? moment(item.end) : null}
                onChange={(e) => {
                  const time = e.toString();
                  const tempObject = item;
                  tempObject.end = time;
                  const tempArray = props.onboarding.scheduledBreaks;
                  tempArray[index] = tempObject;
                  props.setScheduledBreaks(tempArray);
                }}
              />
            </div>
          );
        })}
      </div>

      <p
        style={{
          textDecorationLine: "underline",
          marginTop: "2%",
          fontSize: "17px",
          cursor: "pointer",
          width: "15%",
        }}
        onClick={() => {
          let tempArray = props.onboarding.scheduledBreaks;
          tempArray.push({ start: "", end: "" });
          props.setScheduledBreaks(tempArray);
        }}
      >
        +Add a Break
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setScheduledBreaks: OnboardingActions.setScheduledBreaks,
      setScreenTime: OnboardingActions.setScreenTime,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduledBreakScreen);
