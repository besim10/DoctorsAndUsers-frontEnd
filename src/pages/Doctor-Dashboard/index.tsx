import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../main/hooks/useGetUser";
import { navigateTo } from "../../main/store/stores/navigation/navigation.store";
const DoctorDashboard: FC = () => {
  const navigate = useNavigate();
  const user = useGetUser();
  useEffect(() => {
    if (!user.isDoctor) {
      navigate(-1);
    }
  }, []);
  return (
    <>
      <h3>Doctor Dashboard</h3>
    </>
  );
};

export default DoctorDashboard;
