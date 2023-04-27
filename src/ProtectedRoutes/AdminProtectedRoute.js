import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const AdminProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = Cookies.get("role");
  //   console.log(role);
  const checkUserRole = () => {
    if (!role || role === undefined) {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserRole();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {isLoggedIn && role === "admin" ? props.children : null}
    </React.Fragment>
  );
};
export default AdminProtectedRoute;
