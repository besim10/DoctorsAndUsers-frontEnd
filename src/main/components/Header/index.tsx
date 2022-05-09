import { useDispatch, useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../app/images/logo.png";
import { RootState } from "../../store/redux/rootState";
import AccountMenu from "../ProfileIcon/index";
// import { setSearch } from "../../store/stores/search/search.store";
const Header = () => {
  const currentUser = useGetUser();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const user = useGetUser();

  // const handleClick = () => {
  //   dispatch(onLogout());
  // };

  const handleCartButton = () => {
    navigate("/cart", { replace: true });
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <header>
      <div className="left-side">
        <img
          onClick={handleLogoClick}
          src={logo}
          alt="official-logo"
          className="official-logo"
        />
      </div>
      <div className="right-side">
        <ul className="right-side__list">
          <li>{/* <h3>Welcome, {currentUser.firstName}!</h3> */}</li>
          <li>
            <AccountMenu />
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
