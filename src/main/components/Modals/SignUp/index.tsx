import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import onRegister from "../../../store/stores/user/register.store.on-register";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import "./style.css";
type Data = {
  fullName: string;
  email: string;
  password: string;
  isDoctor: string;
};
function SignUp() {
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState("user");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const register = (data: Data) => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setError("Email is already taken!");
        } else {
          // setAdmin(data.admin);
          // setModal("success-new-admin");
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const isDoctor = selectedOption === "doctor";
    const data = {
      fullName,
      email,
      password,
      isDoctor,
    };

    dispatch(onRegister(data));
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
            sx={{ color: "#50a2fd" }}
            className="close-icon"
            onClick={() => {
              dispatch(invalidateModal());
            }}
          />
          <AdminPanelSettingsIcon
            className="user-icon"
            sx={{ fontSize: 80, color: "#50a2fd" }}
          />
          <h2>NEW ACCOUNT</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              FULL NAME:
              <input
                type="text"
                className="normal-input"
                name="fullName"
                required
              />
            </label>
            <label>
              EMAIL:
              <input
                type="email"
                name="email"
                className="normal-input"
                required
              />
            </label>
            <label>
              PASSWORD:
              <input
                type="password"
                name="password"
                className="normal-input"
                required
              />
            </label>
            Register as:
            <div className="register-container-option">
              <label className="register-option">
                User
                <input
                  type="radio"
                  name="user"
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  className="radio-class"
                  checked={selectedOption === "user"}
                  value="user"
                />
              </label>
              <label className="register-option">
                Doctor
                <input
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  checked={selectedOption === "doctor"}
                  type="radio"
                  name="doctor"
                  className="radio-class"
                  value="doctor"
                />
              </label>
            </div>
            {error !== "" ? <span className="email-error">{error}</span> : null}
            <button className="submit-btn" type="submit">
              SIGN UP
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignUp;
