import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const EditRegularBreakScreen = (props) => {
  const history = useHistory();
  const [hours, setHours] = useState(
    Math.floor(props.onboarding.tempRegularBreakInterval / 60)
  );
  const [mins, setmins] = useState(
    props.onboarding.tempRegularBreakInterval % 60
  );
  return (
    <div className="step-container" style={{ padding: "5%" }}>
      <h1>Regular Breaks</h1>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          How often would you like to take regular breaks?
        </p>
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            size="large"
            style={{ width: "10%", borderRadius: 5, verticalAlign: "center" }}
            placeholder="Interval"
            type="number"
            value={hours.toString()}
            onChange={(e) => {
              if (
                e.target.value.length > 0 &&
                parseInt(e.target.value) < 61 &&
                parseInt(e.target.value) > -1
              ) {
                setHours(parseInt(e.target.value));
              } else {
                setHours("0");
              }
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            hour(s)
          </p>
          <Input
            size="large"
            style={{
              width: "10%",
              borderRadius: 5,
              verticalAlign: "center",
              marginLeft: "2%",
            }}
            placeholder="Interval"
            type="number"
            value={mins.toString()}
            onChange={(e) => {
              if (
                e.target.value.length > 0 &&
                parseInt(e.target.value) < 61 &&
                parseInt(e.target.value) > -1
              ) {
                setmins(parseInt(e.target.value));
              } else {
                setmins("0");
              }
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes(s)
          </p>
        </div>
      </div>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          How long would you like your breaks to be?
        </p>
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            size="large"
            style={{ width: "10%", borderRadius: 5, verticalAlign: "center" }}
            placeholder="Length"
            type="number"
            value={props.onboarding.tempRegularBreakLength.toString()}
            onChange={(e) => {
              if (
                e.target.value.length > 0 &&
                parseInt(e.target.value) < 61 &&
                parseInt(e.target.value) > -1
              ) {
                props.addTempReg(parseInt(e.target.value), 60 * hours + mins);
              } else {
                props.addTempReg(parseInt(""), 60 * hours + mins);
              }
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>
      <div>
        <p>
          You will get a break every {hours.toString()} hour(s) and{" "}
          {mins.toString()} minute(s) for a duration of{" "}
          {props.onboarding.tempRegularBreakLength.toString()} minute(s).
        </p>
      </div>

      <Button
        onClick={() => {
          history.push("/home");
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={async () => {
          props.addTempReg(
            props.onboarding.tempRegularBreakLength,
            60 * hours + mins
          );
          let body = {
            regularBreakLength: props.onboarding.tempRegularBreakLength,
            regularBreakInterval: 60 * hours + mins,
            user: props.onboarding.user._id,
          };
          let response = await axios.post(
            "https://thepallab.com/api/user/update-onb",
            body
          );
          if (response.data.message === "Successful Update") {
            props.setRegularBreakInterval(60 * hours + mins);
            props.setRegularBreakLength(
              props.onboarding.tempRegularBreakLength
            );
            history.push("/home");
          }
        }}
      >
        Update Regular Breaks
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
      setRegularBreakInterval: OnboardingActions.setRegularBreakInterval,
      setRegularBreakLength: OnboardingActions.setRegularBreakLength,
      addTempReg: OnboardingActions.addTempReg,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRegularBreakScreen);
