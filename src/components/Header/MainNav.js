import React, { useContext } from "react";

import "./MainNav.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const MainNav = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="mainNav">
      <NavLink to="/user">Account</NavLink>
      {!auth.isLoggedIn ? (
        <NavLink to="/auth">Login</NavLink>
      ) : (
        <NavLink to="/" onClick={auth.logout}>Logout</NavLink>
      )}
    </div>
  );
};

export default MainNav;
