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
  //   children: React.ReactNode
};
function Actions({ setModal, eventClick }: Props) {
  const [optionSelected, setOptionSelected] = useState(false);

  const dispatch = useDispatch();

  const changeDateFormat = (date: string) => {
    return date.substring(0, date.length - 6);
  };

  const updateEventStatus = async (status: string) => {
    const eventId = eventClick.event._def.publicId;

    const response = await axios.put(`events/${eventId}`, { status: status });
    if (!response.data.error) {
      dispatch(setUser(response.data.updatedUser));
      toast.success("Succesfully updated status");
      setModal("");
    } else {
      alert(response.data.error);
    }
  };
  const handleDeleteEvent = async () => {
    const eventId = eventClick.event._def.publicId;

    const dataFromServer = await (await axios.delete(`events/${eventId}`)).data;
    if (!dataFromServer.error) {
      dispatch(setUser(dataFromServer.updatedUser));
      toast.success(dataFromServer.msg);
      setModal("");
    } else {
      toast.error(dataFromServer.error);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const date = e.target.date.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;

    const start = `${date}T${startTime}:00`;
    const end = `${date}T${endTime}:00`;

    console.log(start, end);
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
                DATE:
                <input
                  type="date"
                  className="normal-input"
                  name="date"
                  min={todayDate()}
                  max={"2023-01-01"}
                  required
                  defaultValue={changeDateFormat(eventClick.event.startStr)}
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
                  // defaultValue={changeDateFormat(eventClick.event.startStr)}
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
                  // defaultValue={changeDateFormat(eventClick.event.startStr)}
                />
              </label>
              <button className="submit-btn" type="submit">
                UPDATE EVENT
              </button>
            </form>
          ) : null}

          <button
            onClick={() => {
              updateEventStatus("refused");
            }}
            className="general-button refuse-btn"
          >
            Refuse
          </button>
          <button
            onClick={() => {
              updateEventStatus("approved");
            }}
            className="general-button approve-btn"
          >
            Approve
          </button>
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
