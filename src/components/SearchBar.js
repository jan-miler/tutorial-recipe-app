import { useState } from "react";
import s from "./SearchBar.module.css";

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
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.bar}
          value={search}
          onChange={updateSearch}
          type="text"
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
