import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useGetUser from "../../../../main/hooks/useGetUser";
import { setUser } from "../../../../main/store/stores/user/user.store";

type Props = {
  setModal: Function;
  selectInfo: DateSelectArg;
};
function AddModal({ setModal, selectInfo }: Props) {
  const user = useGetUser();
  const changeDateFormat = (date: string) => {
    return date.substring(0, date.length - 6);
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      start: changeDateFormat(selectInfo.startStr),
      end: changeDateFormat(selectInfo.endStr),
      doctorPostedId: user.id,
    };
    const userFromServer = await (await axios.post("events", data)).data;

    if (!userFromServer.error) {
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
          <h2>Add Free Event</h2>
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
                type="datetime-local"
                className="normal-input"
                name="startDate"
                disabled
                defaultValue={changeDateFormat(selectInfo.startStr)}
              />
            </label>
            <label>
              END DATE:
              <input
                type="datetime-local"
                className="normal-input"
                name="endDate"
                disabled
                defaultValue={changeDateFormat(selectInfo.endStr)}
              />
            </label>
            <button className="submit-btn" type="submit">
              CREATE EVENT
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default AddModal;
