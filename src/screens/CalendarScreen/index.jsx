import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OnboardingActions } from "../../redux/actions";
import * as dates from "../../utils/dates";
import "./styles.css";
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const CalendarScreen = (props) => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Test",
      id: 1,
    },
  ]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(null);
  const history = useHistory();

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    setEvents(nextEvents);

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  const newEvent = ({ slots, start, end }) => {
    setModalVisible(true);
    let idList = events.map((a) => a.id);
    let newId = Math.max(...idList) + 1;
    let hour = {
      id: newId,
      title: "New Event",
      allDay: slots.length === 1,
      start: start,
      end: end,
    };

    setEvents(events.concat([hour]));
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };

    setDraggedEvent(null);
    this.moveEvent({ event, start, end });
  };

  return (
    <div style={{ height: "100%" }}>
      <Modal
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        Hello
      </Modal>
      <Button
        onClick={() => {
          props.resetInfo();
          history.push("/")
        }}
      >
        Reset
      </Button>
      <DnDCalendar
        selectable
        resizable={true}
        events={events}
        views={["day", "week", "month"]}
        // step={60}
        showMultiDayTimes
        defaultDate={new Date()}
        onSelectSlot={newEvent}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        localizer={localizer}
        max={dates.add(dates.endOf(new Date(), "day"), -1, "hours")}
        style={{ height: props.height ? props.height : window.innerHeight }}
        onEventResize={resizeEvent}
        onEventDrop={moveEvent}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={(event) => {
          setDraggedEvent(event);
        }}
        dragFromOutsideItem={draggedEvent}
        resizableAccessor={() => false}
        onSelectEvent={() => {
          //add code for editing an existing event here
          setModalVisible(true);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetInfo: OnboardingActions.reset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
