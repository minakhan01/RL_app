import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApiCalendar from "react-google-calendar-api";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const { shell } = window.require("electron").remote;

const PersonalInformationScreen = (props) => {
  const [message, setMessage] = useState("Drink Water");
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
    window.ipcRenderer.on("calendar-success", (event, data) => {
      console.log("data", data);
    });
  }, []);

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
        <p style={{ fontSize: "15px", color: "#696969", width: "60%" }}>
          You can set up to 10 messages, the messages will appear interchangebly
          on different breaks
        </p>
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
        <Button
          type="primary"
          style={{ borderRadius: "20px", marginTop: "1%" }}
          size="large"
          onClick={() => {
            // ApiCalendar.handleAuthClick();
            // ApiCalendar.onLoad(() => {
            //   ApiCalendar.listenSign(signUpdate);
            // });
            shell.openExternal("http://localhost:3006/");
          }}
        >
          <PlusOutlined style={{ color: "white" }} />
          ADD CALENDAR
        </Button>
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationScreen);
