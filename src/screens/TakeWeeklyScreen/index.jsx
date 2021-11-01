import React, { useState, useEffect } from "react";
import { PastActions } from "../../redux/actions";
import { Button, Input, Checkbox, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { store } from "../../redux";

const TakeWeeklyScreen = (props) => {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState({});
  const history = useHistory();

  useEffect(() => {
    setInterval(() => {
      let currWeekly = store.getState().onboarding.weekly;
      let lenVal = currWeekly.length + 1;
      let timeNow = new Date();
      let pastTime = new Date(store.getState().onboarding.timestamp);
      const diffTime = Math.abs(timeNow - pastTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= lenVal * 7) {
        setUsername(true);
      }
    }, 600000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "5%",
      }}
    >
      <h1>Take Weekly Survey</h1>
      {username ? (
        <Button
          style={{ marginTop: "2%" }}
          onClick={() => {
            props.setWeeklyRem(false);
            history.push("/week");
          }}
        >
          Now
        </Button>
      ) : (
        <h3 style={{ marginTop: "2%" }}>
          You have already taken it this week!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, past: state.past };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setWeeklyRem: PastActions.setWeeklyRem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TakeWeeklyScreen);
