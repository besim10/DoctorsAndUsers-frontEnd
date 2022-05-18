import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./style.css";
import { todayDate } from "../../../../main/helper-functions";
import { toast } from "react-toastify";
import { setUser } from "../../../../main/store/stores/user/user.store";
import { useState } from "react";

type Props = {
  setModal: Function;
  eventClick: EventClickArg;
  setSelectedDoctor: Function;
  //   children: React.ReactNode
};
function Actions({ setModal, eventClick, setSelectedDoctor }: Props) {
  const [optionSelected, setOptionSelected] = useState(false);

  const dispatch = useDispatch();

  let formatedStartDate = eventClick.event.startStr
    .split("T")
    .join(" ")
    .split("+")
    .join(" ")
    .split(" ");
  let formatedEndDate = eventClick.event.endStr
    .split("T")
    .join(" ")
    .split("+")
    .join(" ")
    .split(" ");
  let startDate = formatedStartDate[0];
  let startTime = formatedStartDate[1];
  let endTime = formatedEndDate[1];

  const handleDeleteEvent = async () => {
    const eventId = eventClick.event._def.publicId;

    const dataFromServer = await (await axios.delete(`events/${eventId}`)).data;
    console.log(dataFromServer);
    if (!dataFromServer.error) {
      setSelectedDoctor(dataFromServer.updatedDoctor);
      dispatch(setUser(dataFromServer.updatedUser));
      toast.success(dataFromServer.msg);
      setModal("");
    } else {
      toast.error(dataFromServer.error);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const date = e.target.date.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;

    const eventId = eventClick.event._def.publicId;

    const start = `${date}T${startTime}`;
    const end = `${date}T${endTime}`;

    const response = await axios.put(`events/${eventId}`, {
      start,
      end,
      title,
    });
    if (!response.data.error) {
      setSelectedDoctor(response.data.updatedDoctor);
      dispatch(setUser(response.data.updatedUser));
      toast.success("Succesfully updated status");
      setModal("");
    } else {
      alert(response.data.error);
    }
  };
  return (
    <div
      onClick={() => {
        setModal("");
      }}
      className="modal-wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container delete-modal-container"
      >
        <header className="modal-header">
          <CloseIcon
            fontSize="large"
            className="close-icon"
            sx={{ color: "#50a2fd" }}
            onClick={() => {
              setModal("");
            }}
          />
          <h2>What do u want to do?</h2>
        </header>
        <main className="modal-body options-modal-body">
          <button
            onClick={() => {
              setOptionSelected(!optionSelected);
            }}
            className="general-button edit-btn"
          >
            Edit
          </button>
          {optionSelected ? (
            <form className="edit-form" onSubmit={handleSubmit}>
              <label>
                TITLE:
                <input
                  type="text"
                  className="normal-input"
                  name="title"
                  minLength={5}
                  required
                  defaultValue={eventClick.event._def.title}
                />
              </label>
              <label>
                DATE:
                <input
                  type="date"
                  className="normal-input"
                  name="date"
                  min={todayDate()}
                  max={"2023-01-01"}
                  required
                  defaultValue={startDate}
                />
              </label>
              <label>
                Start Time
                <input
                  type="time"
                  className="normal-input"
                  name="startTime"
                  min={"08:00:00"}
                  max={"16:00:00"}
                  required
                  defaultValue={startTime}
                />
              </label>
              <label>
                End Time
                <input
                  type="time"
                  className="normal-input"
                  name="endTime"
                  min={"08:00:00"}
                  max={"16:00:00"}
                  required
                  defaultValue={endTime}
                />
              </label>
              <button className="submit-btn" type="submit">
                UPDATE EVENT
              </button>
            </form>
          ) : null}

          <button
            onClick={handleDeleteEvent}
            className="general-button delete-btn"
          >
            Delete
          </button>
        </main>
      </div>
    </div>
  );
}
export default Actions;
