import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TimePicker, Select, Button } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const { Option } = Select;

const EditScheduledBreakScreen = (props) => {
  const history = useHistory();
  return (
    <div className="step-container" style={{ padding: "5%" }}>
      <h1>Scheduled Breaks</h1>

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
        <p style={{ flex: 1 }}>Day</p>
        <p style={{ flex: 1 }}>Start Time</p>
        <p style={{ flex: 1 }}>End Time</p>
      </div>
      <div>
        {props.onboarding.tempScheduledBreaks.map((item, index) => {
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
              <Select
                style={{ flex: 1 }}
                placeholder="Select a day"
                onChange={(value) => {
                  const tempObject = item;
                  tempObject.day = value;
                  const tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray[index] = tempObject;
                  props.addTempSched(tempArray);
                }}
                defaultValue={item.day.length !== 0 ? item.day : null}
              >
                <Option value="monday">Monday</Option>
                <Option value="tuesday">Tuesday</Option>
                <Option value="wednesday">Wednesday</Option>
                <Option value="thursday">Thursday</Option>
                <Option value="friday">Friday</Option>
                <Option value="saturday">Saturday</Option>
                <Option value="sunday">Sunday</Option>
              </Select>
              <TimePicker
                format={"HH:mm"}
                style={{ flex: 1 }}
                value={item.start.length !== 0 ? moment(item.start) : null}
                onChange={(e) => {
                  const time = e.toString();
                  const tempObject = item;
                  tempObject.start = time;
                  const tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray[index] = tempObject;
                  props.addTempSched(tempArray);
                }}
                onSelect={(e) => {
                  const time = e.toString();
                  const tempObject = item;
                  tempObject.start = time;
                  const tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray[index] = tempObject;
                  props.addTempSched(tempArray);
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
                  const tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray[index] = tempObject;
                  props.addTempSched(tempArray);
                }}
                onSelect={(e) => {
                  const time = e.toString();
                  const tempObject = item;
                  tempObject.end = time;
                  const tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray[index] = tempObject;
                  props.addTempSched(tempArray);
                }}
              />
              <Button
                style={{ marginLeft: "2%" }}
                onClick={() => {
                  let tempArray = props.onboarding.tempScheduledBreaks;
                  tempArray.splice(index, 1);
                  props.addTempSched(tempArray);
                }}
              >
                Delete
              </Button>
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
          let tempArray = props.onboarding.tempScheduledBreaks;
          tempArray.push({ start: "", end: "", day: "" });
          props.addTempSched(tempArray);
        }}
      >
        +Add a Break
      </p>
      <Button
        onClick={() => {
          history.push("/home");
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={async () => {
          let body = {
            scheduledBreaks: props.onboarding.tempScheduledBreaks,
            user: props.onboarding.user._id,
          };
          let response = await axios.post(
            "https://thepallab.com/api/user/update-onb",
            body
          );
          if (response.data.message === "Successful Update") {
            props.setScheduledBreaks(props.onboarding.tempScheduledBreaks);
            history.push("/home");
          }
        }}
      >
        Update Scheduled Breaks
      </Button>
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
      addTempSched: OnboardingActions.addTempSched,
      setScreenTime: OnboardingActions.setScreenTime,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditScheduledBreakScreen);
