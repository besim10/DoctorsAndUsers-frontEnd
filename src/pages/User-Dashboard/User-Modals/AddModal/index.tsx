import { DateSelectArg } from "@fullcalendar/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetUser from "../../../../main/hooks/useGetUser";
import IUser from "../../../../main/interfaces/IUser";
import { setUser } from "../../../../main/store/stores/user/user.store";

type Props = {
  setModal: Function;
  selectedDoctor: IUser;
  selectInfo: DateSelectArg;
  setSelectedDoctor: Function;
};
function AddModal({
  setModal,
  selectedDoctor,
  setSelectedDoctor,
  selectInfo,
}: Props) {
  const user = useGetUser();

  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      start: `${selectInfo.startStr}T${e.target.startTime.value}:00`,
      end: `${selectInfo.startStr}T${e.target.endTime.value}:00`,
      userId: user.id,
      doctorId: selectedDoctor.id,
    };

    const userFromServer = await (await axios.post("events", data)).data;

    if (!userFromServer.error) {
      setSelectedDoctor(userFromServer.updatedDoctor);
      dispatch(setUser(userFromServer.updatedUser));
      setModal("");
      toast.success("Succesfully Created Event");
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
        className="modal-container"
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
          <h2>Add New Event</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              TITLE:
              <input
                type="title"
                name="title"
                className="normal-input"
                required
              />
            </label>
            <label>
              START DATE:
              <input
                type="date"
                className="normal-input"
                name="startDate"
                disabled
                defaultValue={selectInfo.startStr}
              />
            </label>
            <label>
              Start Time:
              <input
                type="time"
                name="startTime"
                className="normal-input"
                required
              />
            </label>
            <label>
              END DATE:
              <input
                type="date"
                className="normal-input"
                name="endDate"
                defaultValue={selectInfo.endStr}
                disabled
              />
            </label>
            <label>
              End Time:
              <input
                type="time"
                name="endTime"
                className="normal-input"
                required
              />
            </label>
            <label>
              DOCTOR:
              <input
                type="text"
                className="normal-input"
                name="doctor"
                disabled
                value={selectedDoctor.fullName}
              />
            </label>
            <button type="submit">CREATE EVENT</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default AddModal;
