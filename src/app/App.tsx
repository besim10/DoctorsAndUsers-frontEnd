import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "../main/components/Header";
import Modals from "../main/components/Modals";
import Intro from "../pages/Intro";
import UserDashboard from "../pages/User-Dashboard";
import DoctorDashboard from "../pages/Doctor-Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Modals />
      <Header />
      <main className="default-wrapper">
        <Routes>
          <Route index element={<Navigate to="/intro" />} />
          <Route
            path="/intro"
            element={<PrivateRoute isPageLogin>{<Intro />}</PrivateRoute>}
          />
          <Route
            path="/user-dashboard"
            element={<PrivateRoute>{<UserDashboard />}</PrivateRoute>}
          />
          <Route
            path="/doctor-dashboard"
            element={<PrivateRoute>{<DoctorDashboard />}</PrivateRoute>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
