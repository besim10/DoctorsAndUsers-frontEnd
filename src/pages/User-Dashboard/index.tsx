import { FC, useEffect, useState } from "react";
import "./style.css";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useGetUser from "../../main/hooks/useGetUser";
import IEvent from "../../main/interfaces/IEvent";
import axios from "axios";

const UserDashboard: FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  const user = useGetUser();

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    const responseForEvents: IEvent[] = await (await axios.get("events")).data;
    setEvents(responseForEvents);
  };

  const todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;
    return date;
  };
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "3",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  const handleEvents = () => {
    const allEvents = [...events];

    const returnedArray = [];
    for (const event of allEvents) {
      const object = {
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: false,
        editable: user.id === event.userId,
        color: "#378006",
        className: `${
          user.id === event.userId ? "my-color-events" : "others-color-events"
        }`,
      };
      returnedArray.push(object);
    }
    console.log(returnedArray);
    return returnedArray;
  };
  return (
    <>
      <h3 className="dashboard-title">User Dashboard</h3>
      <div className="dashboard-main">
        <section className="side-bar">
          <h3 className="side-bar__title">Calendar</h3>
          <h4 className="my-color-events">My events</h4>
          <h4 className="others-color-events">Others Events</h4>
        </section>
        <section className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            validRange={{ start: todayDate(), end: "2023-01-01" }}
            selectMirror={true}
            dayMaxEvents={true}
            eventColor="#50a2fd"
            displayEventEnd={true}
            // weekends={this.props.weekendsVisible}
            // datesSet={this.handleDates}
            select={handleDateSelect}
            // events={this.props.events}
            // eventContent={renderEventContent} // custom render function
            // eventClick={this.handleEventClick}
            // eventAdd={this.handleEventAdd}
            // eventChange={this.handleEventChange} // called for drag-n-drop/resize
            // eventRemove={this.handleEventRemove}
            // events={[
            //   {
            //     // this object will be "parsed" into an Event Object
            //     title: "The Title", // a property!
            //     allDay: false,
            //     start: "2022-05-12T10:00:00",
            //     end: "2022-05-12T16:00:00",
            //   },
            // ]}
            events={handleEvents()}
          />
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
