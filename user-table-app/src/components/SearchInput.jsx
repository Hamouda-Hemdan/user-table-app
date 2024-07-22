import React, { useState } from "react";
import "./SearchInput.scss"; 

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    // onSearch(e.target.value);
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={() => onSearch(query)} disabled={!query}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
