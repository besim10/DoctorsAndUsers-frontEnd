import "./style.css";
import AddModal from "./AddModal";
import IUser from "../../../main/interfaces/IUser";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import Actions from "./Actions";
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
    case "actions":
      return (
        <Actions
          setModal={setModal}
          eventClick={eventClick}
          setSelectedDoctor={setSelectedDoctor}
        />
      );
    default:
      return null;
  }
}
export default UserModals;
