import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./style.css";
import { toast } from "react-toastify";
import { setUser } from "../../../../main/store/stores/user/user.store";

type Props = {
  setModal: Function;
  eventClick: EventClickArg;
  //   children: React.ReactNode
};
function DeleteModal({ setModal, eventClick }: Props) {
  const dispatch = useDispatch();

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
          <h2>Do u want to delete this Event ?</h2>
        </header>
        <main className="modal-body delete-modal-body">
          <button
            onClick={() => {
              setModal("");
            }}
            className="general-button cancel-btn"
          >
            Cancel
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
export default DeleteModal;
