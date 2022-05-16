import "./style.css";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch } from "react-redux";
import useGetUser from "../../../hooks/useGetUser";
import axios from "axios";
import { setUser } from "../../../store/stores/user/user.store";

const Notification = () => {
  const dispatch = useDispatch();
  const user = useGetUser();

  const pendingEvents = () => {
    return user.recivedEvents.filter((event) => event.status === "pending");
  };
  const updateEventStatus = async (eventId: number, status: string) => {
    const response = await axios.put(`events/${eventId}`, { status: status });
    if (!response.data.error) {
      dispatch(setUser(response.data.updatedUser));
    } else {
      alert(response.data.error);
    }
  };
  return (
    <div
      onClick={() => {
        dispatch(invalidateModal());
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
            sx={{ color: "#1d5e92" }}
            onClick={() => {
              dispatch(invalidateModal());
            }}
          />
          <NotificationsIcon
            className="user-icon"
            sx={{ fontSize: 80, color: "#1d5e92" }}
          />
          <h2>EVENTS Notifications</h2>
        </header>
        <main className="modal-body">
          {pendingEvents().length !== 0 ? (
            <table className="events-list-table">
              <thead>
                <tr className="events-list-table__row">
                  <th>Client Name:</th>
                  <th>Start:</th>
                  <th>End:</th>
                  <th>Title</th>
                  <th>Status:</th>
                </tr>
              </thead>
              <tbody>
                {pendingEvents().map((event) => (
                  <tr className="events-list-table__row" key={event.id}>
                    <td className="events-list-table__data">
                      {event.normalUser?.fullName}
                    </td>
                    <td className="events-list-table__data">{event.start}</td>
                    <td className="events-list-table__data">{event.end}</td>
                    <td className="events-list-table__data">{event.title}</td>
                    <td className="events-list-table__data">
                      <span>
                        <DoneIcon
                          onClick={() => {
                            updateEventStatus(event.id, "approved");
                          }}
                          sx={{
                            fontSize: 30,
                            color: "#39c32f",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <span>
                        <CloseIcon
                          onClick={() => {
                            updateEventStatus(event.id, "refused");
                          }}
                          sx={{
                            fontSize: 30,
                            color: "#d01212",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>You don't have any Notification!</h3>
          )}
        </main>
      </div>
    </div>
  );
};
export default Notification;
