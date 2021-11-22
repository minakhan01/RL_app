import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Steps, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(["", true]);
  const history = useHistory();

  const addOnbInfo = async () => {
    // history.push("/home");
    // BreakManager(history);
    let body = { ...props.onboarding };
    if (props.onboarding.user && props.onboarding.user._id) {
      body.user = props.onboarding.user._id;
      body.timestamp = new Date();
      let response = await axios.post(
        "https://thepallab.com/api/user/onb",
        body
      );
      if (response.data.message === "Successful Added") {
        history.push("/home");
        BreakManager(history);
      }
    } else {
      history.push("/login");
    }
  };

  const checkStart = async () => {
    let response = await axios.get("https://thepallab.com/api/user/getstate");
    let startInfo = response.data.link;
    setBlocked(startInfo.link);
    setLoading(false);
  };

  useEffect(() => {
    if (props.onboarding.complete) {
      history.push("/home");
    } else if (
      props.onboarding.user &&
      Object.keys(props.onboarding.user).length === 0
    ) {
      history.push("/login");
    } else if (!props.onboarding.awChecked) {
      history.push("/aw");
    } else {
      checkStart();
    }
  }, []);

  if (loading) {
    return (
      <div className="main">
        <p>Loading Information...</p>
      </div>
    );
  } else if (blocked[1]) {
    return (
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Thank you for signing up! we appreciate your interest in our
          experiment. You can start using this app on the {blocked[0]}
        </h2>
        <Button
          onClick={() => {
            setLoading(true);
            checkStart();
          }}
        >
          Refresh
        </Button>
      </div>
    );
  } else {
    return (
      <div className="main">
        {props.onboarding.user.type === "0" && (
          <Steps current={current} labelPlacement="vertical">
            <Step title="PERSONAL INFORMATION" />
            <Step title="SCHEDULED BREAKS" />
            <Step title="INTERVAL BASED BREAKS" />
            <Step title="ACTIVITY BASED BREAKS" />
            <Step title="FINISHING UP" />
          </Steps>
        )}
        {props.onboarding.user.type === "1" && (
          <Steps current={current} labelPlacement="vertical">
            <Step title="PERSONAL INFORMATION" />
            <Step title="SCHEDULED BREAKS" />
            <Step title="FINISHING UP" />
          </Steps>
        )}
        {props.onboarding.user.type === "2" && (
          <Steps current={current} labelPlacement="vertical">
            <Step title="PERSONAL INFORMATION" />
            <Step title="INTERVAL BASED BREAKS" />
            <Step title="FINISHING UP" />
          </Steps>
        )}
        {props.onboarding.user.type === "3" && (
          <Steps current={current} labelPlacement="vertical">
            <Step title="PERSONAL INFORMATION" />
            <Step title="ACTIVITY BASED BREAKS" />
            <Step title="FINISHING UP" />
          </Steps>
        )}
        {props.onboarding.user.type === "4" && (
          <Steps current={current} labelPlacement="vertical">
            <Step title="PERSONAL INFORMATION" />
            <Step title="FINISHING UP" />
          </Steps>
        )}

        {props.onboarding.user.type === "0" && (
          <div>
            {current === 0 && <PersonalInformationScreen />}
            {current === 1 && <ScheduledBreakScreen />}
            {current === 2 && <RegularBreakScreen />}
            {current === 3 && <AdHocBreakScreen />}
            {current === 4 && <FinishingUpScreen />}
          </div>
        )}
        {props.onboarding.user.type === "1" && (
          <div>
            {current === 0 && <PersonalInformationScreen />}
            {current === 1 && <ScheduledBreakScreen />}
            {current === 2 && <FinishingUpScreen />}
          </div>
        )}
        {props.onboarding.user.type === "2" && (
          <div>
            {current === 0 && <PersonalInformationScreen />}
            {current === 1 && <RegularBreakScreen />}
            {current === 2 && <FinishingUpScreen />}
          </div>
        )}
        {props.onboarding.user.type === "3" && (
          <div>
            {current === 0 && <PersonalInformationScreen />}
            {current === 1 && <AdHocBreakScreen />}
            {current === 2 && <FinishingUpScreen />}
          </div>
        )}
        {props.onboarding.user.type === "4" && (
          <div>
            {current === 0 && <PersonalInformationScreen />}
            {current === 1 && <FinishingUpScreen />}
          </div>
        )}
        {props.onboarding.user.type === "0" && (
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
            {current < 4 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                }}
              >
                Next
              </Button>
            )}
            {current === 4 && (
              <Button
                type="primary"
                onClick={() => {
                  props.setOnboardingComplete();
                  // curWindow.minimize();
                  addOnbInfo();
                  // history.push("/home");
                }}
              >
                Done
              </Button>
            )}
          </div>
        )}
        {props.onboarding.user.type === "1" && (
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
            {current < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                }}
              >
                Next
              </Button>
            )}
            {current === 2 && (
              <Button
                type="primary"
                onClick={() => {
                  props.setOnboardingComplete();
                  // curWindow.minimize();
                  addOnbInfo();
                  // history.push("/home");
                }}
              >
                Done
              </Button>
            )}
          </div>
        )}
        {props.onboarding.user.type === "2" && (
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
            {current < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                }}
              >
                Next
              </Button>
            )}
            {current === 2 && (
              <Button
                type="primary"
                onClick={() => {
                  props.setOnboardingComplete();
                  // curWindow.minimize();
                  addOnbInfo();
                  // history.push("/home");
                }}
              >
                Done
              </Button>
            )}
          </div>
        )}
        {props.onboarding.user.type === "3" && (
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
            {current < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                }}
              >
                Next
              </Button>
            )}
            {current === 2 && (
              <Button
                type="primary"
                onClick={() => {
                  props.setOnboardingComplete();
                  // curWindow.minimize();
                  addOnbInfo();
                  // history.push("/home");
                }}
              >
                Done
              </Button>
            )}
          </div>
        )}
        {props.onboarding.user.type === "4" && (
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
            {current < 1 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrent(current + 1);
                }}
              >
                Next
              </Button>
            )}
            {current === 1 && (
              <Button
                type="primary"
                onClick={() => {
                  props.setOnboardingComplete();
                  // curWindow.minimize();
                  addOnbInfo();
                  // history.push("/home");
                }}
              >
                Done
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
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
