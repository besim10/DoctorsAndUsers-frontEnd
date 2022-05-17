import logo from "../../../app/images/logo.png";
import "./style.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalModal } from "../../store/stores/modal/modal.store";
import useGetUser from "../../hooks/useGetUser";
import ProfileIcon from "../ProfileIcon";

function Header() {
  const dispatch = useDispatch();
  const currentUser = useGetUser();
  const pendingEvents = () =>
    currentUser.recivedEvents.filter((event) =>
      event.status.includes("pending")
    );

  return (
    <header>
      <nav className="navigation-header">
        <ul className="logo-section">
          <li className="logo-section__item">
            <img src={logo} />
            <h1>Medica+</h1>
          </li>
        </ul>
        <ul className="login-section">
          {currentUser === null ? (
            <>
              <li className="login-section__button">
                <button
                  onClick={() => {
                    dispatch(setGlobalModal("sign-up"));
                  }}
                >
                  Sign Up
                </button>
              </li>
              <li className="login-section__button">
                <button
                  onClick={() => {
                    dispatch(setGlobalModal("log-in"));
                  }}
                >
                  Log in
                </button>
              </li>
            </>
          ) : (
            <>
              {currentUser.isDoctor ? (
                <>
                  <li>
                    <h3>Welcome, {currentUser?.fullName}! 👨‍⚕️ </h3>
                  </li>
                  <li
                    className="notification-container"
                    onClick={() => {
                      dispatch(setGlobalModal("notification"));
                    }}
                  >
                    <span className="events-length">
                      {pendingEvents().length}
                    </span>
                    <NotificationsIcon
                      sx={{ fontSize: "2.2rem", color: "#1d5e92" }}
                    />
                  </li>
                </>
              ) : (
                <li>
                  <h3>Welcome, {currentUser?.fullName}! 👤</h3>
                </li>
              )}
              <li>
                <ProfileIcon />
              </li>
            </>
          )}
          <li className="login-section__info">
            <h3>Support +38344255255</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
