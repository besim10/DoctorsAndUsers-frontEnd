import { FC, useEffect, useState } from "react";
import "./style.css";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useGetUser from "../../main/hooks/useGetUser";
import { todayDate } from "../../main/helper-functions";
import { motion } from "framer-motion";
import IUser from "../../main/interfaces/IUser";
import axios from "axios";
import UserModals from "./User-Modals";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard: FC = () => {
  const [doctors, setDoctors] = useState<IUser[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<IUser | null>(null);
  const [modal, setModal] = useState("");
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [eventClick, setEventClick] = useState<EventClickArg | null>(null);
  const navigate = useNavigate();
  const calendarRef = React.createRef();

  const user = useGetUser();

  useEffect(() => {
    if (user.isDoctor) {
      navigate(-1);
      return;
    }
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

  const handleEventClick = (eventClick: EventClickArg) => {
    if (
      user.postedEvents.find(
        (event) => event.id === Number(eventClick.event._def.publicId)
      )
    ) {
      setEventClick(eventClick);
      setModal("actions");
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.changeView("timeGridDay", selectInfo.startStr);

    if (selectInfo.view.type === "timeGridDay") {
      const selectedDate = selectInfo.startStr.split("T")[0];
      const matchedDate = user.postedEvents.find(
        (event) =>
          event.start.split("T")[0] === selectedDate &&
          event.doctorId === selectedDoctor.id
      );
      if (matchedDate) {
        toast.error("Maximum is 1 Event/day");
        return;
      }
      const start = selectInfo.start;
      const end = selectInfo.end;

      const startHours = start.getHours();
      const endHours = end.getHours();
      if (endHours - startHours <= 2) {
        setSelectInfo(selectInfo);
        setModal("add-event");
      } else {
        toast.error("Maximum duration for Event is 2 Hours!");
      }
    }
  };

  const handleEvents = () => {
    if (selectedDoctor === null) return [];
    const returnedArray = [];
    for (const event of selectedDoctor.recivedEvents) {
      let color = "";
      switch (event.status) {
        case "approved":
          color = "#39c32f";
          break;
        case "refused":
          color = "#d01212";
          break;
        default:
          color = "#fc9605";
      }

      const object = {
        title: event.title,
        id: `${event.id}`,
        start: event.start,
        end: event.end,
        allDay: false,
        editable: false,
        backgroundColor: `${user.id === event.userId ? color : "#849fb7"}`,
        overlap: false,
        className: `${
          user.id !== event.userId ? "others-color-events" : `${event.status}`
        }`,
      };
      returnedArray.push(object);
    }

    for (const event of selectedDoctor.doctorPostedEvents) {
      const object = {
        title: event.title,
        id: `${event.id}`,
        start: event.start,
        end: event.end,
        allDay: false,
        editable: false,
        backgroundColor: `#8f73b1`,
        overlap: false,
        className: "free-time",
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
        <motion.section
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1, duration: 2 } }}
          className="side-bar"
        >
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
            <ul className="event-list">
              <li>
                <h4>
                  My events
                  <span>Total: {selectedDoctor?.recivedEvents.length}</span>
                </h4>
              </li>
              <li className="event-list__item pending">
                Pending
                <span>
                  {
                    selectedDoctor?.recivedEvents.filter(
                      (event) =>
                        event.status.includes("pending") &&
                        event.userId === user.id
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item approved">
                Approved
                <span>
                  {
                    user.postedEvents.filter((event) =>
                      event.status.includes("approved")
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item refused">
                Refused
                <span>
                  {
                    user.postedEvents.filter((event) =>
                      event.status.includes("refused")
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item free-time">
                Doctor free Event
                <span>{selectedDoctor?.doctorPostedEvents.length}</span>
              </li>
              <li className="event-list__item others-color-events">
                Others Events
                <span>
                  {
                    selectedDoctor?.recivedEvents.filter(
                      (event) => event.userId !== user.id
                    ).length
                  }
                </span>
              </li>
            </ul>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 850 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
          className="calendar"
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            //@ts-ignore
            ref={calendarRef}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            validRange={{ start: todayDate(), end: "2023-01-01" }}
            selectMirror={true}
            dayMaxEvents={true}
            height="auto"
            eventTimeFormat={{
              hour: "2-digit", //2-digit, numeric
              minute: "2-digit", //2-digit, numeric
              hour12: false, //true, false
            }}
            slotMinTime={"08:00:00"}
            slotMaxTime={"16:00:00"}
            displayEventEnd={true}
            weekends={false}
            slotDuration="01:00:00"
            allDaySlot={false}
            selectOverlap={() => {
              //@ts-ignore
              let calendarApi = calendarRef.current.getApi();
              if (calendarApi.view.type === "timeGridDay") {
                return false;
              }
              return true;
            }}
            selectAllow={(selectInfo) => {
              let startDate = selectInfo.start;
              let endDate = selectInfo.end;
              endDate.setSeconds(endDate.getSeconds() - 1);
              if (startDate.getDate() === endDate.getDate()) {
                return true;
              }
              return false;
            }}
            select={handleDateSelect}
            eventClick={handleEventClick}
            events={handleEvents()}
          />
        </motion.section>
      </div>
    </>
  );
};

export default UserDashboard;
