import style from "./recipe.module.css";

const Recipe = ({ title, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <img className={style.image} src={image} alt="" />
      <h1 className={style.header}>{title}</h1>
      <ol className={style.ingredients}>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.foodId + index}>{ingredient.text}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;
