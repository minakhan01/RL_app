import React, { useState } from "react";
import { BreakActions, OnboardingActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;

const CBTestScreen = (props) => {
  const [username, setUsername] = useState("");
  const [values, setvalues] = useState([]);
  const [password, setPassword] = useState("1");
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "5%",
      }}
    >
      <h3>Enter the number you see</h3>
      <img src={require("../../assets/Plate" + password + ".jpg").default} />
      <Input
        placeholder="Enter the number you see..."
        style={{
          marginBottom: "3%",
          borderRadius: "8px",
          width: "20%",
          marginTop: "2%",
        }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      {password === "15" ? (
        <Button
          onClick={() => {
            let tempVal = [...values];
            tempVal.push(username);
            props.addCbt(tempVal);
            history.push("/week")
          }}
        >
          Done
        </Button>
      ) : (
        <Button
          onClick={() => {
            let curr = parseInt(password);
            curr += 1;
            setPassword(curr.toString());
            let tempVal = [...values];
            tempVal.push(username);
            setvalues(tempVal);
            setUsername("");
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { break: state.break, onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addCbt: OnboardingActions.addCbt }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CBTestScreen);
