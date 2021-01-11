import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import * as dates from "../utils/dates";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Test",
    },
  ]);

  const onEventResize = (data) => {};

  const onEventDrop = (data) => {
    console.log(data);
    const { start, end } = data;
    events[0].start = start;
    events[0].end = end;
    setEvents(events);
  };

  return (
    <DnDCalendar
      events={events}
      views={["day", "week", "month"]}
      step={60}
      showMultiDayTimes
      defaultDate={new Date()}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
      max={dates.add(dates.endOf(new Date(), "day"), -1, "hours")}
      style={{ height: 500 }}
      onEventResize={onEventResize}
      onEventDrop={onEventDrop}
    />
  );
};

export default CalendarComponent;
