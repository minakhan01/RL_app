import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Steps, Button } from "antd";
import { useHistory } from "react-router-dom";

import PersonalInformationScreen from "./PersonalInformation";
import ScheduledBreakScreen from "./ScheduledBreaks";
import RegularBreakScreen from "./RegularBreaks";
import AdHocBreakScreen from "./AdHocBreaks";
import FinishingUpScreen from "./FinishingUp";
import { OnboardingActions } from "../../redux/actions";
import "./styles.css";
import { setOnboardingComplete } from "../../redux/actions/onboarding.action";
import BreakManager from "../../breakmanager";

const { Step } = Steps;

const OnboardingScreen = (props) => {
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (props.onboarding.complete) {
      history.push("/home");
    } else if (props.onboarding.user && Object.keys(props.onboarding.user).length === 0) {
      history.push("/login");
    } else if (!props.onboarding.awChecked) {
      history.push("/aw");
    }
  }, []);

  return (
    <div className="main">
      <Steps current={current} labelPlacement="vertical">
        <Step title="PERSONAL INFORMATION" />
        {/* <Step title="SCHEDULED BREAKS" /> */}
        <Step title="INTERVAL BASED BREAKS" />
        <Step title="ACTIVITY BASED BREAKS" />
        <Step title="FINISHING UP" />
      </Steps>
      <div>
        {current === 0 && <PersonalInformationScreen />}
        {/* {current === 1 && <ScheduledBreakScreen />} */}
        {current === 1 && <RegularBreakScreen />}
        {current === 2 && <AdHocBreakScreen />}
        {current === 3 && <FinishingUpScreen />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {current > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              setCurrent(current - 1);
            }}
          >
            Back
          </Button>
        )}
        {current < 3 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrent(current + 1);
            }}
          >
            Next
          </Button>
        )}
        {current === 3 && (
          <Button
            type="primary"
            onClick={() => {
              props.setOnboardingComplete();
              // curWindow.minimize();
              history.push("/home");
              BreakManager(history);
            }}
          >
            Done
          </Button>
        )}
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
      setOnboardingComplete: OnboardingActions.setOnboardingComplete,
      reset: OnboardingActions.reset,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
