import { useState, useEffect } from "react";
import "./App.css";

import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "";

  const APP_KEY = "";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const recipes = await res.json();
      setRecipes(recipes.hits);
    };

    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === "") return;
    setQuery(search.trim());
  };

  return (
    <div className="App">
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

      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
