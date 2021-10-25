import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const RegularBreakScreen = (props) => {
  return (
    <div className="step-container">
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
            value={props.onboarding.regularBreakInterval.toString()}
            onChange={(e) => {
              props.setRegularBreakInterval(parseInt(e.target.value));
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            Hour(s)
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
            value={props.onboarding.regularBreakLength.toString()}
            onChange={(e) => {
              if (e.target.value > 0)
                props.setRegularBreakLength(parseInt(e.target.value));
            }}
          />
          <p style={{ marginTop: "1%", marginLeft: "1%", fontSize: "15px" }}>
            minutes
          </p>
        </div>
      </div>
      <div>
        <p>
          You will get a break every{" "}
          {props.onboarding.regularBreakInterval.toString()} hour(s) for a
          duration of {props.onboarding.regularBreakLength.toString()} minutes.
        </p>
      </div>
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegularBreakScreen);
