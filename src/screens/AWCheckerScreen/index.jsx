import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import BreakManager from "../../breakmanager";
import { AWClientService } from "../../services";
import AWError from "../../assets/awerror.png";
import AWFull from "../../assets/awfull.png";
import AWscreen from "../../assets/awscreen.png";

import "./styles.css";
var shell = window.require("electron").shell;
let client = new AWClientService();

const AWCheckerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    awcheck();
  }, []);

  const awcheck = async () => {
    // props.awChecked();
    // history.push("/");
    try {
      let resp = await client.getAppTotals();
      if (Object.keys(resp).length > 0) {
        props.awChecked();
        if (props.onboarding.complete) {
          BreakManager(history);
          history.push("/home");
        } else {
          history.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("look", error);
    }
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Checking if you have activity watch
        </h3>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "5%",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          You need to install and turn on activity watch! Please hit refresh
          after installing and turning on activity watch
        </h3>
        <h4>How to install activity watch:</h4>
        <p
          className="linktext"
          style={{ color: "blue" }}
          onClick={() => {
            shell.openExternal("https://github.com/ActivityWatch/activitywatch/releases/download/v0.10.0/activitywatch-v0.10.0-macos-x86_64.dmg");
          }}
        >
          1. Download the latest version of activity watch by clicking here.
        </p>
        <p
          className="linktext"
          style={{ color: "blue" }}
          onClick={() => {
            shell.openExternal(
              "https://docs.activitywatch.net/en/latest/getting-started.html#installation"
            );
          }}
        >
          2. Click here and follow the instructions to install activity watch.
        </p>
        <p>
          3. After installing , launch activity watch. You may encounter the
          following error :
        </p>
        <img src={AWError} width="350px" height="200px" />
        <p>If you do see this error then follow these instructions :</p>
        <p>
          3.1 : Go in "System Preferences / Security & Privacy / General":
          you'll see text close to the bottom of the window mentioning the
          offending file and a button to allow execution
        </p>
        <p>3.2 : Click the "Allow" button in the Security & Privacy window</p>
        <p>3.3 : Close and restart activity watch</p>
        <p
          className="linktext"
          style={{ color: "blue" }}
          onClick={() => {
            shell.openExternal(
              "https://chrome.google.com/webstore/detail/activitywatch-web-watcher/nglaklhklhcoonedhgnpgddginnjdadi"
            );
          }}
        >
          4. Install activity watch chrome extension by clicking here
        </p>
        <p>5. You will see a small activty watch logo in your tray : </p>
        <img src={AWFull} width="100px" height="100px" />
        <p>6. You have successfully installed activity watch.</p>
        <p
          className="linktext"
          style={{ color: "blue" }}
          onClick={() => {
            shell.openExternal("http://localhost:5600");
          }}
        >
          7. To make sure Activity Watch is running please click here and verify
          you see the following page :
        </p>
        <img src={AWscreen} width="500px" height="300px" />
        <p>
          7.1 : If you do not see the screen above, please launch activity watch
          from launchpad and click on the link above again. Once you see the
          screen above hit refresh to continue.
        </p>
        <Button
          onClick={() => {
            setLoading(true);
            awcheck();
          }}
        >
          Refresh
        </Button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ awChecked: OnboardingActions.awChecked }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AWCheckerScreen);
