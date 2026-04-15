import { useAuth } from "../Context/contextProvider";
import { useNavigate } from "react-router-dom";
function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
    logout();
    navigate("/login");
  return <div></div>;
}

export default Logout;