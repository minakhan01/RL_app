import React, { useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
var shell = window.require("electron").shell;

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async () => {
    let body = { email: username, password };
    message.info("Logging in, please wait...");
    let response = await axios.post(
      "https://thepallab.com/api/user/loginid",
      body
    );
    if (response.data.message === "Successful Login") {
      props.loginUserAction(response.data.userInfo);
      history.push("/aw");
      let onbData = response.data.onbInfo;
      if (onbData.length > 0) {
        let findata = onbData[0];
        delete findata.user;
        findata.complete = true;
        props.addOnbInfo(findata);
      }
    } else {
      message.error(
        "There was an error while logging in. Please check your login credentials and try again!"
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Please Login To Continue</h3>
      <div style={{ marginTop: "5%" }}>
        <Input
          placeholder="Email"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          style={{ borderRadius: "8px" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          loginUser();
        }}
      >
        Login
      </Button>

      <Button
        style={{ background: "white", marginTop: "5%" }}
        onClick={() => {
          history.push("/signup");
        }}
      >
        Don't have an account? Click here to register
      </Button>

      <Button
        style={{ background: "white", marginTop: "5%" }}
        onClick={() => {
          shell.openExternal("https://thepallab.com/forgotpass");
        }}
      >
        Forgot Password
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loginUserAction: OnboardingActions.loginUser,
      addOnbInfo: OnboardingActions.addOnbInfo,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
