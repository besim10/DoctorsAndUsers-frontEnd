import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import Notification from "./Notification";
import "./style.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Modals() {
  const modal = useSelector((state: RootState) => state.modal);

  switch (modal) {
    case "log-in":
      return <SignIn />;
    case "sign-up":
      return <SignUp />;
    case "notification":
      return <Notification />;
    default:
      return null;
  }
}
export default Modals;
