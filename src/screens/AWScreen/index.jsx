import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";
var electron = window.require("electron");
var curWindow = electron.remote.getCurrentWindow();

const AWScreen = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [stroop, setstroop] = useState([]);
  const [fruit, setfruit] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let today = startDate;
    today.setHours(0, 0, 0, 0);
    let tomorrow = endDate;
    tomorrow.setHours(23, 59, 59, 999);
    let diffTime = tomorrow - today;
    const dateDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let datesAll = [];
    for (let i = 0; i < dateDiff; i++) {
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      let tempObj = {};
      if (datesAll.length === 0) {
        newDate = new Date(today);
        newDate.setDate(newDate.getDate() + 1);
        tempObj["today"] = today.toUTCString();
        tempObj["tomorrow"] = newDate.toUTCString();
      } else {
        newDate = new Date(datesAll[i - 1]["tomorrow"]);
        newDate.setDate(newDate.getDate() + 1);
        tempObj["today"] = datesAll[i - 1]["tomorrow"];
        tempObj["tomorrow"] = newDate.toUTCString();
      }
      datesAll.push(tempObj);
    }

    let body = {
      user: props.onboarding.user._id,
      dates: datesAll,
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/awchart",
      body
    );
    if (response.data.finalArrayStroop) {
      let stroopDataTemp = response.data.finalArrayStroop;
      for (let i = 1; i < stroopDataTemp.length; i++) {
        let newDate = new Date(stroopDataTemp[i][0]);
        stroopDataTemp[i][0] =
          newDate.getDate() + "/" + (newDate.getMonth() + 1);
      }
      setstroop(stroopDataTemp);
    }
    if (response.data.finalArrayFruit) {
      let fruitDataTemp = response.data.finalArrayFruit;
      for (let i = 1; i < fruitDataTemp.length; i++) {
        let newDate = new Date(fruitDataTemp[i][0]);
        fruitDataTemp[i][0] =
          newDate.getDate() + "/" + (newDate.getMonth() + 1);
      }
      setfruit(fruitDataTemp);
    }
    setLoading(false);
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
        <h3 style={{ textAlign: "center" }}>Loading data...</h3>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "2%" }}>
        {/* <Button
          onClick={() => {
            setLoading(true);
            getData();
          }}
        >
          Refresh
        </Button> */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            Start Date :
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </div>
          <div>
            End Date :
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </div>
          <Button
            onClick={() => {
              setLoading(true);
              getData();
            }}
          >
            Get Data
          </Button>
        </div>
        <div
          style={{
            borderWidth: "1px",
            borderColor: "lightgray",
            borderStyle: "solid",
            padding: "2%",
            margin: "1%",
            borderRadius: "10px",
          }}
        >
          <Chart
            width={"1000px"}
            height={"300px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={stroop}
            options={{
              // Material design options
              vAxis: {
                title: "Score",
              },
              colors: ["#0092C8", "#EA8600"],
              chart: {
                title: "Stroop Score vs Total Computer Usage",
              },
              series: {
                0: { axis: "distance" }, // Bind series 0 to an axis named 'distance'.
                1: { axis: "brightness" }, // Bind series 1 to an axis named 'brightness'.
              },
              axes: {
                y: {
                  distance: { label: "Stroop Score" }, // Bottom x-axis.
                  brightness: {
                    side: "top",
                    label: "Total Computer Usage(hours)",
                  }, // Top x-axis.
                },
              },
            }}
            // For tests
            rootProps={{ "data-testid": "2" }}
          />
        </div>
        <div
          style={{
            borderWidth: "1px",
            borderColor: "lightgray",
            borderStyle: "solid",
            padding: "2%",
            margin: "1%",
            borderRadius: "10px",
          }}
        >
          <Chart
            width={"1000px"}
            height={"300px"}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={fruit}
            options={{
              // Material design options
              vAxis: {
                title: "Score",
              },
              colors: ["#0092C8", "#EA8600"],
              chart: {
                title: "CPT Score vs Total Computer Usage",
              },
              series: {
                0: { axis: "distance" }, // Bind series 0 to an axis named 'distance'.
                1: { axis: "brightness" }, // Bind series 1 to an axis named 'brightness'.
              },
              axes: {
                y: {
                  distance: { label: "CPT Score" }, // Bottom x-axis.
                  brightness: {
                    side: "top",
                    label: "Total Computer Usage(hours)",
                  }, // Top x-axis.
                },
              },
            }}
            // For tests
            rootProps={{ "data-testid": "2" }}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AWScreen);
