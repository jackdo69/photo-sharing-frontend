import React from "react";

import "./Header.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Logo />
        <SearchBar />
        <MainNav />
      </div>
    </div>
  );
};

export default Header;
