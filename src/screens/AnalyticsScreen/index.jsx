import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AnalyticsScreen = (props) => {
  const [stroop, setstroop] = useState([]);
  const [fruit, setfruit] = useState([]);
  const [score, setscore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let today = startDate;
    today.setHours(0, 0, 0, 0);
    let tomorrow = endDate;
    tomorrow.setHours(23, 59, 59, 999);
    let body = {
      user: props.onboarding.user._id,
      today: today,
      tomorrow: tomorrow,
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/get-break",
      body
    );
    if (response.data.finalArrayStroop) {
      let stroopDataTemp = response.data.finalArrayStroop;
      for (let i = 1; i < stroopDataTemp.length; i++) {
        let newDate = new Date(stroopDataTemp[i][0]);
        stroopDataTemp[i][0] =
          newDate.getDate() +
          "/" +
          (newDate.getMonth() + 1) +
          " " +
          newDate.getHours() +
          ":" +
          (newDate.getMinutes() < 10 ? "0" : "") +
          newDate.getMinutes();
      }
      setstroop(stroopDataTemp);
    }
    if (response.data.finalArrayFruit) {
      let fruitDataTemp = response.data.finalArrayFruit;
      for (let i = 1; i < fruitDataTemp.length; i++) {
        let newDate = new Date(fruitDataTemp[i][0]);
        fruitDataTemp[i][0] =
          newDate.getDate() +
          "/" +
          (newDate.getMonth() + 1) +
          " " +
          newDate.getHours() +
          ":" +
          (newDate.getMinutes() < 10 ? "0" : "") +
          newDate.getMinutes();
      }
      setfruit(fruitDataTemp);
      console.log("loo", fruitDataTemp);
    }
    if (response.data.finalScore) {
      let scoreDataTemp = response.data.finalScore;
      for (let i = 1; i < scoreDataTemp.length; i++) {
        let newDate = new Date(scoreDataTemp[i][0]);
        scoreDataTemp[i][0] =
          newDate.getDate() +
          "/" +
          (newDate.getMonth() + 1) +
          " " +
          newDate.getHours() +
          ":" +
          (newDate.getMinutes() < 10 ? "0" : "") +
          newDate.getMinutes();
      }
      setscore(scoreDataTemp);
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
                title: "Stroop Score",
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
                title: "CPT Score",
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
          {score.length > 1 && (
            <Chart
              width={"1000px"}
              height={"300px"}
              chartType="Scatter"
              loader={<div>Loading Chart</div>}
              data={score}
              options={{
                chart: {
                  title: "How helpful was the break?",
                },

                pointsVisible: true,
              }}
              rootProps={{ "data-testid": "3" }}
            />
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsScreen);
