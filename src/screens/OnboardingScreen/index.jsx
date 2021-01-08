import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Steps, Button } from "antd";

import PersonalInformationScreen from "./PersonalInformation";
import ScheduledBreakScreen from "./ScheduledBreaks";
import RegularBreakScreen from "./RegularBreaks";
import AdHocBreakScreen from "./AdHocBreaks";
import FinishingUpScreen from "./FinishingUp";
import "./styles.css";

const { Step } = Steps;

const OnboardingScreen = (props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className="main">
      <Steps current={current} labelPlacement="vertical">
        <Step title="PERSONAL INFORMATION" />
        <Step title="SCHEDULED BREAKS" />
        <Step title="INTERVAL BASED BREAKS" />
        <Step title="ACTIVITY BASED BREAKS" />
        <Step title="FINISHING UP" />
      </Steps>
      <div>
        {current === 0 && <PersonalInformationScreen />}
        {current === 1 && <ScheduledBreakScreen />}
        {current === 2 && <RegularBreakScreen />}
        {current === 3 && <AdHocBreakScreen />}
        {current === 4 && <FinishingUpScreen />}
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
            //   onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
