import React, { useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input, message } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
var validator = require("email-validator");
var shell = window.require("electron").shell;

const { TextArea } = Input;

const SignupScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [goal, setGoal] = useState("");
  const history = useHistory();

  const loginUser = async () => {
    let body = {
      email: username,
      password,
      name,
      age,
      gender,
      occupation,
      education,
      location,
      goal,
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/register",
      body
    );
    if (response.data.message === "User Added!") {
      message.success("New user registered");
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
      <div style={{ marginTop: "0.5%", width: "90%" }}>
        <Button
          onClick={() => {
            history.push("/login");
          }}
        >
          Back
        </Button>
      </div>
      <div style={{ marginTop: "2%", width: "50%" }}>
        <Input
          placeholder="Name *"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder="Email * (Please use your gmail account. You can sync your Google Calendar in the next step!)"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input.Password
          placeholder="Password *"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          placeholder="Age (Optional)"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <Input
          placeholder="Gender (Optional)"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <Input
          placeholder="Occupation (Optional)"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={occupation}
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />
        <Input
          placeholder="Education (Optional)"
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          value={education}
          onChange={(e) => {
            setEducation(e.target.value);
          }}
        />
        <Input
          placeholder="Location (Optional)"
          style={{ borderRadius: "8px" }}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <p style={{ marginTop: "1%" }}>
          What is your goal with this application?
        </p>

        <TextArea
          placeholder="None of the above? Type your reason..."
          style={{ marginBottom: "3%", borderRadius: "8px" }}
          rows={4}
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        />
      </div>

      <Button
        style={{ background: "white", marginTop: "2%" }}
        onClick={() => {
          if (validator.validate(username)) {
            if (name.length > 0 && password.length > 0) {
              message.info("Registering New User");
              loginUser();
            } else {
              message.error("Please fill all the required fields!");
            }
          } else {
            message.error("Please enter a valid email address!");
          }
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
