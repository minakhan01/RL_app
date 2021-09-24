import React, { useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginUser = async () => {
    let body = { email: username, password };
    let response = await axios.post(
      "https://thepallab.com/api/user/loginid",
      body
    );
    if (response.data.message === "Successful Login") {
      props.loginUserAction(response.data.userInfo);
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { loginUserAction: OnboardingActions.loginUser },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
