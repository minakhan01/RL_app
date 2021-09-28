import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as dates from "../utils/dates";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const CalendarComponent = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log("look", response);
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

  return (
    <Calendar
      events={events}
      views={["day", "week", "month"]}
      step={60}
      showMultiDayTimes
      localizer={localizer}
      defaultDate={new Date()}
      popup
      style={{ height: 500 }}
    />
  );
};

const mapStateToProps = (state) => {
  return { onboarding: state.onboarding };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);
