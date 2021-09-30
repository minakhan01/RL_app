import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import BreakManager from "../../breakmanager";
import { AWClientService } from "../../services";
let client = new AWClientService();

const AWCheckerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    awcheck();
  }, []);

  const awcheck = async () => {
    // props.awChecked();
    // history.push("/");
    try {
      let resp = await client.getAppTotals();
      if (Object.keys(resp).length > 0) {
        props.awChecked();
        if (props.onboarding.complete) {
          BreakManager(history);
          history.push("/home");
        } else {
          history.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("look", error);
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Checking if you have activity watch
        </h3>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          You need to install and turn on activity watch! Please hit refresh
          after installing and turning on activity watch
        </h3>
        <Button
          onClick={() => {
            setLoading(true);
            awcheck();
          }}
        >
          Refresh
        </Button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ awChecked: OnboardingActions.awChecked }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AWCheckerScreen);
