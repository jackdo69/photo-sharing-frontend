import React from "react";

import "./MainNav.css";
import {NavLink} from 'react-router-dom';

const MainNav = () => {
  return (
    <div className="mainNav">
      <NavLink to="/user">Account</NavLink>
      <NavLink to="/auth">Login</NavLink>
    </div>
  );
};

export default MainNav;
