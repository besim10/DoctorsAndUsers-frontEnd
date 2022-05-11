import { toast } from "react-toastify";
import AuthManager from "../../../utils/authManager";
import { AppThunk } from "../../redux/appThunk";
import { navigateTo } from "../navigation/navigation.store";
import { invalidateUser } from "./user.store";

const onLogout = (): AppThunk => async (dispatch) => {
  const notify = () => toast.success("Succesfully Signed Out");
  dispatch(invalidateUser());
  AuthManager.logout();
  dispatch(navigateTo("/intro"));
  notify();
};

export default onLogout;
