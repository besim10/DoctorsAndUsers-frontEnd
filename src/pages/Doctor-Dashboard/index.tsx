import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../main/hooks/useGetUser";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import todayDate from "../../main/helper-function";
const DoctorDashboard: FC = () => {
  const navigate = useNavigate();
  const user = useGetUser();
  useEffect(() => {
    if (!user.isDoctor) {
      navigate(-1);
    }
  }, []);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.changeView("timeGridDay", selectInfo.startStr);

    if (selectInfo.view.type === "timeGridDay") {
      // setSelectInfo(selectInfo);
      // setModal("add-event");
    }
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
    return returnedArray;
  };
  return (
    <>
      <h3 className="dashboard-title">Doctor Dashboard</h3>
      <div className="dashboard-main">
        <section className="side-bar">
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
            </ul>
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
            displayEventEnd={true}
            businessHours={[
              {
                startTime: "08:00",
                endTime: "18:00",
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            ]}
            weekends={false}
            select={handleDateSelect}
            // eventClick={handleEventClick}
            events={handleEvents()}
          />
        </section>
      </div>
    </>
  );
};

export default DoctorDashboard;
