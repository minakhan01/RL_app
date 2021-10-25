import React, { useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
var shell = window.require("electron").shell;

const SignupScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const loginUser = async () => {
    let body = { email: username, password, name };
    let response = await axios.post(
      "https://thepallab.com/api/user/register",
      body
    );
    if (response.data.message === "User Added!") {
      props.loginUserAction(response.data.newUser);
      history.push("/aw");
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
      <h3 style={{ textAlign: "center" }}>Please Register To Continue</h3>
      <div style={{ marginTop: "5%" }}>
        <Input
          placeholder="Name"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        Register
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
