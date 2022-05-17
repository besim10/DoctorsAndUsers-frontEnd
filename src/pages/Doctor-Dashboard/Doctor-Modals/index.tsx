import "./style.css";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import Actions from "./Actions";

import IUser from "../../../main/interfaces/IUser";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";

type Props = {
  modal: string;
  selectInfo: DateSelectArg;
  setModal: Function;
  eventClick: EventClickArg;
};

function DoctorModals({ modal, setModal, eventClick, selectInfo }: Props) {
  switch (modal) {
    case "add-event":
      return <AddModal setModal={setModal} selectInfo={selectInfo} />;
    case "delete-event":
      return <DeleteModal setModal={setModal} eventClick={eventClick} />;
    case "actions":
      return <Actions setModal={setModal} eventClick={eventClick} />;
    default:
      return null;
  }
}
export default DoctorModals;
