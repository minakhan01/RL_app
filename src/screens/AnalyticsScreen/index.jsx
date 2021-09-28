import React, { useEffect, useState } from "react";
import { OnboardingActions } from "../../redux/actions";
import { Button, Input } from "antd";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";

const AnalyticsScreen = (props) => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Red Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "# of Blue Votes",
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "# of Green Votes",
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  return (
    <div style={{ padding: "2%" }}>
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
          data={[
            ["Time", "Pre-break", "Post-break"],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
          ]}
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
          data={[
            ["Time", "Pre-break", "Post-break"],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
            ["9:15", 4, 4],
            ["10:00", 4, 6],
            ["10:30", 5, 8],
            ["11:00", 6, 8],
          ]}
          options={{
            // Material design options
            vAxis: {
              title: "Score",
            },
            colors: ["#0092C8", "#EA8600"],
            chart: {
              title: "Fruit Ninja Score",
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
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={[
            ["Time", "Score"],
            ["9:15", 0],
            ["10:00", 2],
            ["10:30", 3],
            ["11:00", 1],
            ["9:15", 0],
            ["10:00", 2],
            ["10:30", 3],
            ["11:00", 1],
            ["9:15", 0],
            ["10:00", 2],
            ["10:30", 3],
            ["11:00", 1],
            ["9:15", 0],
            ["10:00", 2],
            ["10:30", 3],
            ["11:00", 1],
          ]}
          options={{
            chart: {
              title: "How helpful was the break?",
            },
          }}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsScreen);
