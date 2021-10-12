import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

const AWScreen = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //   curWindow.loadURL("http://localhost:5600")
  }, []);

  return (
    <div style={{ padding: "2%" }}>
      <webview is nodeintegration width="100%" height="100%" src="https://stackoverflow.com/questions/46802329/how-to-load-content-for-external-url-in-react/46803191" />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AWScreen);
