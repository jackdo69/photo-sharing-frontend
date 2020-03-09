import React, { useContext } from "react";

import "./MainNav.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const MainNav = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="mainNav">
      <NavLink to={`/${auth.userId}`}>Account</NavLink>
      {!auth.isLoggedIn ? (
        <NavLink to="/auth">Login</NavLink>
      ) : (
        <NavLink to="/auth" onClick={auth.logout}>Logout</NavLink>
      )}
    </div>
  );
};

export default MainNav;
