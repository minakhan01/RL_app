import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Modal, message } from "antd";
import * as dates from "../utils/dates";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.png";
import s5 from "../assets/s5.png";

import s1y from "../assets/s1y.png";
import s2y from "../assets/s2y.png";
import s3y from "../assets/s3y.png";
import s4y from "../assets/s4y.png";
import s5y from "../assets/s5y.png";
import "./styles.css";

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const CalendarComponent = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [rate, setRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let mounted = true;

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);
    let body = {
      user: props.onboarding.user._id,
      today: today,
      tomorrow: tomorrow,
    };
    let response = await axios.post(
      "https://thepallab.com/api/user/get-break-cal",
      body
    );
    if (response.data.finalData) {
      let dataTemp = response.data.finalData;
      for (let i = 0; i < dataTemp.length; i++) {
        let newDate = new Date(dataTemp[i].start);
        dataTemp[i].start = newDate;
        let newDateEnd = new Date(dataTemp[i].end);
        dataTemp[i].end = newDateEnd;
      }

      setEvents(dataTemp);
    }
    setLoading(false);
  };

  const onEventResize = (data) => {};

  const onEventDrop = (data) => {
    const { start, end } = data;
    events[0].start = start;
    events[0].end = end;
    setEvents(events);
  };
  let getImageButton = (name, name2, points, rate, setRate, mounted) => {
    if (points == rate)
      return (
        <div className="responsive">
          <div className="gallery">
            <button
              className="feedback-button"
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="responsive">
          <div className="gallery">
            <button
              className="feedback-button"
              onClick={() => {
                if (mounted) setRate(points);
              }}
            >
              <p style={{ fontSize: "50px", opacity: "0.5" }}>{points - 1}</p>
            </button>
          </div>
        </div>
      );
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
      <div>
        <Modal
          visible={modalVisible}
          onOk={async () => {
            let body = {
              _id: selectedEvent._id,
              feedbackText,
              feedbackScore: rate,
            };
            let response = await axios.post(
              "https://thepallab.com/api/user/update-break",
              body
            );
            if (response.data.message !== "Successful Update") {
              message.error("Your entry was not updated");
            }
            setModalVisible(false);
            setLoading(true);
            getData();
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        >
          <div>
            <p>
              Break Start : {new Date(selectedEvent.start).getDate()}{" "}
              {months[new Date(selectedEvent.start).getMonth()]},{" "}
              {new Date(selectedEvent.start).getHours()}:
              {(new Date(selectedEvent.start).getMinutes() < 10 ? "0" : "") +
                new Date(selectedEvent.start).getMinutes()}
            </p>
            <p>
              Break End : {new Date(selectedEvent.end).getDate()}{" "}
              {months[new Date(selectedEvent.end).getMonth()]},{" "}
              {new Date(selectedEvent.end).getHours()}:
              {(new Date(selectedEvent.end).getMinutes() < 10 ? "0" : "") +
                new Date(selectedEvent.end).getMinutes()}
            </p>
            <p>Break Type : {selectedEvent.title}</p>
            <p>Break Score : </p>
            <div className="break-feedback">
              {getImageButton(s5, s5y, 1, rate, setRate, mounted)}
              {getImageButton(s4, s4y, 2, rate, setRate, mounted)}
              {getImageButton(s3, s3y, 3, rate, setRate, mounted)}
              {getImageButton(s2, s2y, 4, rate, setRate, mounted)}
              {getImageButton(s1, s1y, 5, rate, setRate, mounted)}
            </div>
            <p>Break Feedback : </p>
            <div className="feedback-text-box">
              <textarea
                onChange={(event) => {
                  if (mounted) setFeedbackText(event.target.value);
                }}
                data-role="none"
                rows="3"
                cols="80"
                placeholder="Type in here any notes or reflections about the break that you would like to save"
                className="feedback-text"
                value={feedbackText}
              />
            </div>
          </div>
        </Modal>
        <Calendar
          events={events}
          views={["day", "week", "month"]}
          step={60}
          showMultiDayTimes
          localizer={localizer}
          defaultDate={new Date()}
          popup
          style={{ height: 500 }}
          onSelectEvent={(event) => {
            //add code for editing an existing event here
            setSelectedEvent(event);
            setRate(event.feedbackScore);
            setFeedbackText(event.feedbackText);
            setModalVisible(true);
          }}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);
