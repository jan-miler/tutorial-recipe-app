import { useState, useEffect } from "react";
import s from "./App.module.css";

import Recipe from "./components/Recipe";
import SearchBar from "./components/SearchBar";

const App = () => {
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
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
  }, [APP_ID, APP_KEY, query]);

  const updateQuery = query => {
    setQuery(query);
  };

  return (
    <div className={s.App}>
      <h1 className={s.header}>Recipe App</h1>

      <SearchBar updateQuery={updateQuery} />

      <div className={s.recipes}>
        {recipes.length ? (
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        ) : (
          <p>We did not find any recipes</p>
        )}
      </div>
    </div>
  );
};

export default App;
