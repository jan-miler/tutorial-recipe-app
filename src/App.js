import { useState, useEffect } from "react";
import s from "./App.module.css";

import Recipe from "./components/Recipe";
import SearchBar from "./components/SearchBar";

const App = () => {
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("chicken");
  const [count, setCount] = useState(null);
  const [showLoading, setshowLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

      if (res.ok) {
        const recipes = await res.json();

        setRecipes(recipes.hits);
        setCount(recipes.count);
        setshowLoading(false);
        return;
      }
      throw Error();
    };

    getRecipes().catch(err => setError(err.message));
  }, [APP_ID, APP_KEY, query]);

  const updateQuery = query => {
    setQuery(query);
  };

  return (
    <div className={s.App}>
      <h1 className={s.header}>Recipe App</h1>

      <SearchBar updateQuery={updateQuery} />

      <div className={s.recipes}>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

      {error !== null && (
        <p style={{ fontSize: "2rem", textAlign: "center", color: "red" }}>
          {`Error occurred:  ${error}`}
        </p>
      )}

      {count === 0 && (
        <p style={{ fontSize: "2rem", textAlign: "center" }}>
          We did not find any recipes for {`"${query}"`}
        </p>
      )}

      {showLoading && !error && (
        <p style={{ fontSize: "2rem", textAlign: "center" }}>Loading ...</p>
      )}
    </div>
  );
};

export default App;
