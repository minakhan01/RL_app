import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tabs, Modal } from "antd";
import { OnboardingActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import CalendarComponent from "../../components/Calendar";
import AnalyticsScreen from "../AnalyticsScreen";
import HomeScreen from "../HomeScreen";
const { TabPane } = Tabs;

const NewHomeScreen = (props) => {
  const history = useHistory();

  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" type="card" size={"large"}>
          <TabPane tab="Break Settings" key="1">
            <HomeScreen />
          </TabPane>
          <TabPane tab="Past Breaks" key="2">
            <CalendarComponent />
          </TabPane>
          <TabPane tab="Analytics" key="3">
            <AnalyticsScreen />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding, break: state.break };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetInfo: OnboardingActions.reset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewHomeScreen);
