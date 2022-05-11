import AuthManager from "../../../utils/authManager";
import { AppThunk } from "../../redux/appThunk";
import { navigateTo } from "../navigation/navigation.store";
import { setUser } from "./user.store";
import ILoginRequest from "../../../interfaces/ILoginRequest";
import { invalidateModal } from "../modal/modal.store";
import { toast } from "react-toastify";

const onLogin =
  (payload: ILoginRequest): AppThunk =>
  async (dispatch) => {
    try {
      const response = await AuthManager.loginWithCredentials({ ...payload });
      if (response.user && response.token) {
        dispatch(setUser(response.user));
        dispatch(navigateTo("/"));
        dispatch(invalidateModal());
        toast.success("Succesfully Signed In");
      }
    } catch (err: any) {
      return err;
    }
  };

export default onLogin;
