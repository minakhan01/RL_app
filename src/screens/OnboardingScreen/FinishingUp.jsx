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
          schedule as shown below. On an average, you have 9 breaks in a day
          <br />
          <br />
        </p>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          If you want to make any changes, click on the back button and change
          your settings. You can always come back and make edits to your
          schedule and overrides in 'My Settings'.
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FinishingUpScreen);
