import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

import "./SearchBar.css";
const SearchBar = () => {
  const history = useHistory();
  const [query, setQuery] = useState("");

  const handleInput = event => {
    setQuery(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      history.push(`/search/${query}`);
      
    }
  };

  return (
    <div className="searchBar">
      <form>
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
      </form>
    </div>
  );
};

export default SearchBar;
