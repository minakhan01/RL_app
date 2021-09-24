import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { OnboardingActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";

import "./styles.css";

const HomeScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  const history = useHistory();

  return (
    <div className="step-container">
      <div style={{ marginTop: "3%", width: "70%", margin: "5%" }}>
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
                      new Date(item.start).getMinutes()}
                  </p>
                  <p style={{ flex: 1 }}>
                    {new Date(item.end).getHours() +
                      ":" +
                      new Date(item.end).getMinutes()}
                  </p>
                </div>
              );
            })}
          </div>
        </div> */}
        <div style={{ width: "100%" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Regular Breaks :{" "}
          </p>
          <p>
            How often you want to take regular breaks :{" "}
            {props.onboarding.regularBreakInterval} minute(s)
          </p>
          <p>
            How long you want these breaks to be :{" "}
            {props.onboarding.regularBreakLength} minute(s)
          </p>
        </div>
        <Button>My Settings</Button>
        {/* <Button
          onClick={() => {
            props.resetInfo();
            history.push("/");
          }}
        >
          Reset
        </Button> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding, break: state.break };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetInfo: OnboardingActions.reset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
