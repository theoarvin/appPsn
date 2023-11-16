import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/auth.slice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem("googleToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="header">
      <div>
        <Link style={{ color: "blue" }} to="/chatBot">
          chatBot
        </Link>
        <Link style={{ color: "blue" }} to="/studio">
          studio
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
