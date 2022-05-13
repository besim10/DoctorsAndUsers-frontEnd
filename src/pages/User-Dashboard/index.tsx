import { FC, useEffect, useState } from "react";
import "./style.css";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  CalendarApi,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useGetUser from "../../main/hooks/useGetUser";
import IUser from "../../main/interfaces/IUser";
import axios from "axios";
import UserModals from "./User-Modals";
import React from "react";

const UserDashboard: FC = () => {
  const [doctors, setDoctors] = useState<IUser[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IUser | null>(null);
  const [modal, setModal] = useState("");
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [eventClick, setEventClick] = useState<EventClickArg | null>(null);

  let calendarRef = React.createRef();
  const user = useGetUser();

  useEffect(() => {
    getAllDoctors();
    return () => {
      setDoctors([]);
    };
  }, []);

  const getAllDoctors = async () => {
    const doctorsFromServer: IUser[] = await (await axios.get("doctors")).data;
    setDoctors(doctorsFromServer);
  };
  useEffect(() => {
    if (doctors.length === 0) return;
    const defaultDoctor = doctors?.find((doctor) =>
      doctor.fullName.includes("Ed Putans")
    );
    setSelectedDoctor(defaultDoctor);
  }, [doctors]);

  const todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;
    return date;
  };

  const handleEventClick = (eventClick: EventClickArg) => {
    if (
      selectedDoctor.recivedEvents.find((event) => event.userId === user.id)
    ) {
      setEventClick(eventClick);
      setModal("delete-event");
      // alert("Do u want to delete it?");
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    //@ts-ignore

    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("timeGridDay", selectInfo.startStr);

    if (selectInfo.view.type === "timeGridDay") {
      setSelectInfo(selectInfo);
      setModal("add-event");
    }
  };
  const handleDateClick = (info: any) => {};
  const handleEvents = () => {
    const returnedArray = [];

    if (selectedDoctor === null) return [];
    for (const event of selectedDoctor.recivedEvents) {
      const object = {
        title: event.title,
        id: `${event.id}`,
        start: event.start,
        end: event.end,
        allDay: false,
        editable: false,
        // editable: user.id === event.userId,
        color: "#378006",
        overlap: false,
        className: `${
          user.id === event.userId ? "my-color-events" : "others-color-events"
        }`,
      };
      returnedArray.push(object);
    }
    return returnedArray;
  };
  if (doctors.length === 0) return <h3>Loading...</h3>;
  return (
    <>
      <UserModals
        modal={modal}
        setModal={setModal}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        selectInfo={selectInfo}
        eventClick={eventClick}
      />
      <h3 className="dashboard-title">User Dashboard</h3>
      <div className="dashboard-main">
        <section className="side-bar">
          <div className="doctor-selection">
            <h3>Select a Doctor!</h3>
            <select
              onChange={(e) => {
                const doctor = doctors.find(
                  (doctor) => doctor.id === Number(e.target.value)
                );
                setSelectedDoctor(doctor);
              }}
              name="doctors"
              value={selectedDoctor?.id}
            >
              {doctors.map((doctor) => (
                <option value={doctor.id} key={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="legenda">
            <h3 className="side-bar__title">Legenda:</h3>
            <h4 className="my-color-events">My events</h4>
            <h4 className="others-color-events">Others Events</h4>
          </div>
        </section>
        <section className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            validRange={{ start: todayDate(), end: "2023-01-01" }}
            selectMirror={true}
            dayMaxEvents={true}
            eventColor="#50a2fd"
            dateClick={handleDateClick}
            displayEventEnd={true}
            weekends={false}
            //@ts-ignore
            ref={calendarRef}
            // datesSet={this.handleDates}
            select={handleDateSelect}
            // events={this.props.events}
            // eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
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
