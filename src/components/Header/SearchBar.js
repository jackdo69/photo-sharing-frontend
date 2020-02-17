import React from "react";

import "./SearchBar.css";
const SearchBar = () => {
  return (
    <div className="searchBar">
      <form>
        <input type="search" placeholder="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
