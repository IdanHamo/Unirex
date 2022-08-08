import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipesService from "../../services/recipesService";

const FullRecipe = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async function () {
      const { data } = await recipesService.viewRecipe(params.id);
      setRecipe(data);
    };
    getRecipe();
  }, []);

  return (
    <>
      {recipe && (
        <div>
          <h1 className="text-center mt-5">{recipe.dishName}</h1>
          <img
            src={recipe.dishImage && recipe.dishImage}
            alt={recipe.dishName}
          />
          <div className="mt-5">
            <h3>Ingredients</h3>
            <ul className="mt-5 ps-5">
              {recipe.dishIngredients &&
                recipe.dishIngredients.map((ingredient) => {
                  return <li key={Math.random()}>{ingredient}</li>;
                })}
            </ul>
          </div>
          <div className="instructions my-5">
            {recipe.dishInstructions && recipe.dishInstructions}
          </div>
        </div>
      )}
    </>
  );
};

export default FullRecipe;
