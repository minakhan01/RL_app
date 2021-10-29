import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const { shell } = window.require("electron").remote;

const PersonalInformationScreen = (props) => {
  const [message, setMessage] = useState(null);
  const [added, setAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    window.ipcRenderer.on("calendar-success", (event, data) => {});
  }, []);

  const loginUser = async (id) => {
    let body = { _id: id };
    let response = await axios.post(
      "https://thepallab.com/api/user/login",
      body
    );
    if (response.data.user) {
      props.loginUserAction(response.data.user);
    }
  };

  return (
    <div className="step-container">
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <h1>Personal Information</h1>
      <p style={{ fontSize: "18px", marginBottom: "0" }}>Name</p>
      <Input
        size="large"
        style={{ width: "30%", borderRadius: 5, verticalAlign: "center" }}
        placeholder="First Name"
        value={props.onboarding.name}
        onChange={(e) => {
          props.setName(e.target.value);
        }}
      />
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          Would you like any message to show up during the break? (e.g. drink
          water, be kind, etc.)
        </p>
        {/* <p style={{ fontSize: "15px", color: "#696969", width: "60%" }}>
          You can set up to 10 messages, the messages will appear interchangebly
          on different breaks
        </p> */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            size="large"
            style={{
              width: "30%",
              borderRadius: 5,
              verticalAlign: "center",
            }}
            placeholder="Break Message"
            value={props.onboarding.breakMessage}
            onChange={(e) => {
              props.setBreakMessage(e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: "3%" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          Add a calendar to help us keep track of any meetings/breaks we should
          work around
        </p>
        {added ? (
          <Button
            type="primary"
            style={{ borderRadius: "20px", marginTop: "1%" }}
            size="large"
          >
            Calendar Added!
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ borderRadius: "20px", marginTop: "1%" }}
            size="large"
            onClick={() => {
              // ApiCalendar.handleAuthClick();
              // ApiCalendar.onLoad(() => {
              //   ApiCalendar.listenSign(signUpdate);
              // });
              shell.openExternal("https://thepallab.com/auth/google");
              let intervalInfo = setInterval(() => {
                if (props.onboarding.user.token.length > 0) {
                  setAdded(true);
                  clearInterval(intervalInfo);
                } else {
                  loginUser(props.onboarding.user._id);
                }
              }, 10000);
            }}
          >
            <PlusOutlined style={{ color: "white" }} />
            ADD CALENDAR
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setName: OnboardingActions.setName,
      setBreakMessage: OnboardingActions.setBreakMessage,
      loginUserAction: OnboardingActions.loginUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationScreen);
