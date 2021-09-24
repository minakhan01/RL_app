import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import { AWClientService } from "../../services";
let client = new AWClientService();

const AWCheckerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    awcheck();
  }, []);

  const awcheck = async () => {
    try {
      let resp = await client.getAppTotals();
      if (Object.keys(resp).length > 0) {
        history.push("/");
        props.awChecked();
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
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ awChecked: OnboardingActions.awChecked }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AWCheckerScreen);
