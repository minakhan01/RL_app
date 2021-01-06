import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Menu, Dropdown, Button, Modal, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./styles.css";

const AdHocBreakScreen = (props) => {
  const [breakArray, setBreakArray] = useState(["https://www.youtube.com"]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sites, setSites] = useState([
    { name: "Youtube", url: "https://www.youtube.com", key: "1" },
  ]);
  const [currentSite, setCurrentSite] = useState([]);
  const [breakLength, setBreakLength] = useState(1);
  const [breakInterval, setBreakInterval] = useState(60);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClick = ({ key }) => {
    if (key === (sites.length + 1).toString()) {
      setIsModalVisible(true);
    } else {
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      {sites.map((item, index) => {
        return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
      })}
      <Menu.Item key={(sites.length + 1).toString()}>+ADD ANOTHER</Menu.Item>
    </Menu>
  );

  console.log("l");

  return (
    <div className="step-container" style={{ marginBottom: "10px" }}>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <h1>Break Overrides</h1>

      <div style={{ marginTop: "2%" }}>
        <p style={{ fontSize: "15px", color: "#696969", width: "60%" }}>
          This section is to set up any specific breaks that you want to take.
          For example you can set the app up to start some breaks every time you
          open a specific app like Facebook.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              marginTop: "1%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "60%",
            }}
          >
            <p style={{ flex: 2, fontSize: "18px" }}>Site Name</p>
            <p style={{ flex: 1, fontSize: "18px" }}>After Every</p>
            <p style={{ flex: 1, fontSize: "18px" }}>take a Break For</p>
          </div>
          {breakArray.map((item, index) => {
            return (
              <div style={{ marginTop: "1%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "60%",
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button
                        size="large"
                        style={{
                          borderRadius: 5,
                          width: "80%",
                        }}
                      >
                        {currentSite[index] ? (
                          currentSite[index].name
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            Select Site
                            <DownOutlined style={{ fontSize: "13px" }} />
                          </div>
                        )}
                      </Button>
                    </Dropdown>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      size="large"
                      style={{
                        borderRadius: 5,
                        verticalAlign: "center",
                        width: "40%",
                      }}
                      placeholder="First Name"
                      type="number"
                      value={breakInterval}
                      onChange={(e) => {
                        if (e.target.value > 0 && e.target.value < 61)
                          setBreakInterval(e.target.value);
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <p
                        style={{
                          paddingTop: "20%",
                          marginLeft: "7%",
                          fontSize: "15px",
                          flex: 1,
                          height: "100%",
                        }}
                      >
                        minutes
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      size="large"
                      style={{
                        borderRadius: 5,
                        verticalAlign: "center",
                        width: "40%",
                      }}
                      placeholder="First Name"
                      type="number"
                      value={breakLength}
                      onChange={(e) => {
                        if (e.target.value > 0) setBreakLength(e.target.value);
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <p
                        style={{
                          paddingTop: "20%",
                          marginLeft: "7%",
                          fontSize: "15px",
                          flex: 1,
                          height: "100%",
                        }}
                      >
                        minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <p
            style={{
              textDecorationLine: "underline",
              marginTop: "2%",
              fontSize: "17px",
            }}
            onClick={() => {
              let tempArray = breakArray;
              let newNumber = Object.values(breakArray).length + 1;
              tempArray[newNumber] = "";
              console.log("asd", tempArray);
              setBreakArray(tempArray);
            }}
          >
            +Add Override
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdHocBreakScreen);
