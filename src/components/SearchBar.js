import { useState } from "react";

const SearchBar = ({ updateQuery }) => {
  const [search, setSearch] = useState("");

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === "") return;
    updateQuery(search.trim());
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          value={search}
          onChange={updateSearch}
          type="text"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
