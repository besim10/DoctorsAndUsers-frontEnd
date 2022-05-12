import "./style.css";
import AddModal from "./AddModal";
import IUser from "../../../main/interfaces/IUser";
import { DateSelectArg } from "@fullcalendar/react";

type Props = {
  modal: string;
  setModal: Function;
  selectedDoctor: IUser;
  setSelectedDoctor: Function;
  selectInfo: DateSelectArg;
};

function UserModals({
  modal,
  setModal,
  selectedDoctor,
  setSelectedDoctor,
  selectInfo,
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
    default:
      return null;
  }
}
export default UserModals;
