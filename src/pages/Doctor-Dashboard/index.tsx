import FullCalendar, {
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useGetUser from "../../main/hooks/useGetUser";
import { setGlobalModal } from "../../main/store/stores/modal/modal.store";
import DoctorModals from "./Doctor-Modals";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { todayDate } from "../../main/helper-functions";
import { useDispatch } from "react-redux";
import React from "react";
const DoctorDashboard: FC = () => {
  const navigate = useNavigate();
  const calendarRef = React.createRef();
  const [eventClick, setEventClick] = useState<EventClickArg | null>(null);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [modal, setModal] = useState("");
  const user = useGetUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isDoctor) {
      navigate(-1);
    }
    if (
      user.recivedEvents.filter((event) => event.status.includes("pending"))
        .length > 0
    ) {
      dispatch(setGlobalModal("notification"));
    }
  }, []);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;

    calendarApi.changeView("timeGridDay", selectInfo.startStr);
    if (selectInfo.view.type === "timeGridDay") {
      calendarApi.setOption("selectOverlap", () => false);
      console.log(selectInfo);
      setSelectInfo(selectInfo);
      setModal("add-event");
    }
  };
  const handleEventClick = (eventClick: EventClickArg) => {
    setEventClick(eventClick);
    setModal("actions");
  };
  const handleEvents = () => {
    const returnedArray = [];

    for (const event of user.recivedEvents) {
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
        overlap: false,
        backgroundColor: color,
        className: `${event.status}`,
      };
      returnedArray.push(object);
    }
    for (const event of user.doctorPostedEvents) {
      const object = {
        title: event.title,
        id: `${event.id}`,
        start: event.start,
        end: event.end,
        allDay: false,
        editable: false,
        overlap: false,
        backgroundColor: "#8f73b1",
        className: "free-time",
      };
      returnedArray.push(object);
    }
    return returnedArray;
  };

  return (
    <>
      <DoctorModals
        modal={modal}
        setModal={setModal}
        eventClick={eventClick}
        selectInfo={selectInfo}
      />
      <h3 className="dashboard-title">Doctor Dashboard</h3>
      <div className="dashboard-main">
        <motion.section
          initial={{ opacity: 0, x: -200 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { delay: 1, duration: 2 },
          }}
          className="side-bar"
        >
          <div className="doctor-selection"></div>
          <div className="legenda">
            <h3 className="side-bar__title">Legenda:</h3>
            <ul className="event-list">
              <li>
                <h4>
                  My events <span>Total: {user.recivedEvents.length}</span>
                </h4>
              </li>
              <li className="event-list__item pending">
                Pending
                <span>
                  {
                    user.recivedEvents.filter((event) =>
                      event.status.includes("pending")
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item approved">
                Approved
                <span>
                  {
                    user.recivedEvents.filter((event) =>
                      event.status.includes("approved")
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item refused">
                Refused
                <span>
                  {
                    user.recivedEvents.filter((event) =>
                      event.status.includes("refused")
                    ).length
                  }
                </span>
              </li>
              <li className="event-list__item free-time">
                My free time
                <span>{user.doctorPostedEvents.length}</span>
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
            allDaySlot={false}
            displayEventEnd={true}
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
              endDate.setSeconds(endDate.getSeconds() - 1); // allow full day selection
              if (startDate.getDate() === endDate.getDate()) {
                return true;
              }
              return false;
            }}
            weekends={false}
            select={handleDateSelect}
            eventClick={handleEventClick}
            events={handleEvents()}
          />
        </motion.section>
      </div>
    </>
  );
};

export default DoctorDashboard;
function setEventClick(eventClick: EventClickArg) {
  throw new Error("Function not implemented.");
}
function selectAllow(arg0: (e: DateSelectArg) => boolean): any {
  throw new Error("Function not implemented.");
}
