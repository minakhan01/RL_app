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
  return (
    <div className="step-container" style={{ padding: "5%" }}>
      <h1>Regular Breaks</h1>
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
              if (e.target.value > 0)
                props.addTempReg(
                  parseInt(e.target.value),
                  props.onboarding.tempRegularBreakInterval
                );
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          After how long would you like to take regular breaks?
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
            value={props.onboarding.tempRegularBreakInterval.toString()}
            onChange={(e) => {
              if (e.target.value > 0 && e.target.value < 61)
                props.addTempReg(
                  props.onboarding.tempRegularBreakLength,
                  parseInt(e.target.value)
                );
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
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
          let body = {
            regularBreakLength: props.onboarding.tempRegularBreakLength,
            regularBreakInterval: props.onboarding.tempRegularBreakInterval,
            user: props.onboarding.user._id,
          };
          let response = await axios.post(
            "https://thepallab.com/api/user/update-onb",
            body
          );
          if (response.data.message === "Successful Update") {
            props.setRegularBreakInterval(
              props.onboarding.tempRegularBreakInterval
            );
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
