import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Menu, Dropdown, Button, Modal, message, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { OnboardingActions } from "../../redux/actions";

import "./styles.css";

const EditAdHocBreakScreen = (props) => {
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [isWeb, setIsWeb] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sites, setSites] = useState([
    { name: "Youtube", url: "https://www.youtube.com", key: "1" },
  ]);
  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSiteName("");
    setSiteUrl("");
    setIsWeb(true);
  };

  const menu = (mainIndex) => (
    <Menu
      onClick={({ key }) => {
        if (
          key === (props.onboarding.tempOverRideSites.length + 1).toString()
        ) {
          setIsModalVisible(true);
        } else {
          let keyInt = parseInt(key);
          let tempArray = props.onboarding.tempAllOverRides;
          let tempObj = tempArray[mainIndex];
          let siteObject = props.onboarding.tempOverRideSites[keyInt - 1];
          tempObj.name = siteObject.name;
          tempObj.url = siteObject.url;
          tempObj.isWebsite =
            siteObject.isWebsite === true || siteObject.isWebsite === false
              ? siteObject.isWebsite
              : true;
          tempArray[mainIndex] = tempObj;
          props.addTempAct(props.onboarding.tempOverRideSites, tempArray);
        }
      }}
    >
      {props.onboarding.tempOverRideSites.map((item, index) => {
        return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
      })}
      <Menu.Item
        key={(props.onboarding.tempOverRideSites.length + 1).toString()}
      >
        +ADD ANOTHER
      </Menu.Item>
    </Menu>
  );

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      className="step-container"
      style={{ marginBottom: "10px", margin: "2%" }}
    >
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
        width={700}
      >
        <div style={{ margin: "7%" }}>
          <h2>Add an Activity</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Input
              size="large"
              style={{
                width: "45%",
                borderRadius: 5,
                verticalAlign: "center",
                marginRight: "2.5%",
              }}
              placeholder="Activity Name"
              value={siteName}
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
            />
            <Input
              size="large"
              style={{
                width: "45%",
                borderRadius: 5,
                verticalAlign: "center",
                marginLeft: "2.5%",
              }}
              placeholder="Activity URL/File Name"
              value={siteUrl}
              onChange={(e) => {
                setSiteUrl(e.target.value);
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
          >
            <p style={{ marginRight: "1%" }}>Website</p>
            <Checkbox
              style={{ flex: 1 }}
              onChange={(e) => {
                setIsWeb(true);
              }}
              checked={isWeb}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "0.2%" }}
          >
            <p style={{ marginRight: "1%" }}>Desktop Application</p>
            <Checkbox
              style={{ flex: 1 }}
              onChange={(e) => {
                setIsWeb(false);
              }}
              checked={!isWeb}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "8%",
            }}
          >
            <Button
              style={{ marginRight: "2.5%" }}
              onClick={() => {
                setIsModalVisible(false);
              }}
            >
              CANCEL
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "2.5%" }}
              onClick={() => {
                let key = (
                  props.onboarding.tempOverRideSites.length + 1
                ).toString();
                let tempArray = props.onboarding.tempOverRideSites;
                let finalSiteName = Capitalize(siteName);
                tempArray.push({
                  url: siteUrl,
                  name: finalSiteName,
                  key,
                  isWebsite: isWeb,
                });
                props.addTempAct(tempArray, props.onboarding.tempAllOverRides);
                setIsModalVisible(false);
              }}
            >
              ADD ACTIVITY
            </Button>
          </div>
        </div>
      </Modal>
      <h1>Break Overrides</h1>

      <div style={{ marginTop: "2%" }}>
        <p style={{ fontSize: "15px", color: "#696969", width: "80%" }}>
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
              width: "100%",
            }}
          >
            <p style={{ flex: 2, fontSize: "18px" }}>Activity Name</p>
            <p style={{ flex: 1, fontSize: "18px" }}>After Every</p>
            <p style={{ flex: 1, fontSize: "18px" }}>take a Break For</p>
            <p style={{ flex: 1, fontSize: "18px" }}></p>
          </div>
          {props.onboarding.tempAllOverRides.map((item, index) => {
            return (
              <div style={{ marginTop: "1%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <Dropdown overlay={menu(index)} trigger={["click"]}>
                      <Button
                        size="large"
                        style={{
                          borderRadius: 5,
                          width: "80%",
                        }}
                      >
                        {item.name.length !== 0 ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {item.name}
                            <DownOutlined style={{ fontSize: "13px" }} />
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            Select Activity
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
                        width: "45%",
                      }}
                      placeholder="Interval"
                      type="number"
                      value={item.interval}
                      onChange={(e) => {
                        if (
                          e.target.value.length > 0 &&
                          parseInt(e.target.value) < 61 &&
                          parseInt(e.target.value) > -1
                        ) {
                          let tempArray = props.onboarding.tempAllOverRides;
                          let tempObj = tempArray[index];
                          tempObj.interval = e.target.value;
                          tempArray[index] = tempObj;
                          props.addTempAct(
                            props.onboarding.tempOverRideSites,
                            tempArray
                          );
                        } else {
                          let tempArray = props.onboarding.tempAllOverRides;
                          let tempObj = tempArray[index];
                          tempObj.interval = "";
                          tempArray[index] = tempObj;
                          props.addTempAct(
                            props.onboarding.tempOverRideSites,
                            tempArray
                          );
                        }
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
                        width: "45%",
                      }}
                      placeholder="Length"
                      type="number"
                      value={item.breakLength}
                      onChange={(e) => {
                        if (
                          e.target.value.length > 0 &&
                          parseInt(e.target.value) < 61 &&
                          parseInt(e.target.value) > -1
                        ) {
                          let tempArray = props.onboarding.tempAllOverRides;
                          let tempObj = tempArray[index];
                          tempObj.breakLength = e.target.value;
                          tempArray[index] = tempObj;
                          props.addTempAct(
                            props.onboarding.tempOverRideSites,
                            tempArray
                          );
                        } else {
                          let tempArray = props.onboarding.tempAllOverRides;
                          let tempObj = tempArray[index];
                          tempObj.breakLength = "";
                          tempArray[index] = tempObj;
                          props.addTempAct(
                            props.onboarding.tempOverRideSites,
                            tempArray
                          );
                        }
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
                    <Checkbox
                      checked={item.cumulative}
                      onChange={(e) => {
                        let tempArray = props.onboarding.tempAllOverRides;
                        let tempObj = tempArray[index];
                        tempObj.cumulative = e.target.checked;
                        tempArray[index] = tempObj;
                        props.addTempAct(
                          props.onboarding.tempOverRideSites,
                          tempArray
                        );
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
                        Cumulative
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
                    <Button
                      style={{ marginLeft: "2%" }}
                      onClick={() => {
                        let tempArray = props.onboarding.tempAllOverRides;
                        tempArray.splice(index, 1);
                        props.addTempAct(
                          props.onboarding.tempOverRideSites,
                          tempArray
                        );
                      }}
                    >
                      Delete
                    </Button>
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
              cursor: "pointer",
              width: "15%",
            }}
            onClick={() => {
              let tempArray = props.onboarding.tempAllOverRides;
              tempArray.push({
                name: "",
                url: "",
                interval: 60,
                breakLength: 1,
                isWebsite: true,
              });
              props.addTempAct(props.onboarding.tempOverRideSites, tempArray);
            }}
          >
            +Add Override
          </p>
        </div>
      </div>
      <Button
        onClick={() => {
          history.push("/home");
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={async () => {
          let body = {
            overRideSites: props.onboarding.tempOverRideSites,
            allOverRides: props.onboarding.tempAllOverRides,
            user: props.onboarding.user._id,
          };
          let response = await axios.post(
            "https://thepallab.com/api/user/update-onb",
            body
          );
          if (response.data.message === "Successful Update") {
            props.setAllOverrides(props.onboarding.tempAllOverRides);
            props.setOverrideSites(props.onboarding.tempOverRideSites);
            history.push("/home");
          }
        }}
      >
        Update Activity Based Breaks
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAllOverrides: OnboardingActions.setAllOverrides,
      setOverrideSites: OnboardingActions.setOverrideSites,
      addTempAct: OnboardingActions.addTempAct,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAdHocBreakScreen);
