import "./style.css";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import IUser from "../../../main/interfaces/IUser";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";

type Props = {
  modal: string;
  setModal: Function;
  selectedDoctor: IUser;
  setSelectedDoctor: Function;
  selectInfo: DateSelectArg;
  eventClick: EventClickArg;
};

function UserModals({
  modal,
  setModal,
  selectedDoctor,
  setSelectedDoctor,
  selectInfo,
  eventClick,
}: Props) {
  switch (modal) {
    case "add-event":
      return (
        <AddModal
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          setModal={setModal}
          selectInfo={selectInfo}
        />
      );
    case "delete-event":
      return (
        <DeleteModal
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          setModal={setModal}
          eventClick={eventClick}
        />
      );
    default:
      return null;
  }
}
export default UserModals;
