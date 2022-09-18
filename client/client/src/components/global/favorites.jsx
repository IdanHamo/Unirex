import { useEffect } from "react";
import { useState } from "react";
import { getFavoritesAsync } from "../../services/favoriteService";
import ApiRecipeCard from "../common/APIrecipeCard";
import RecipeCard from "../common/recipesCard";
const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const getFavorites = async function () {
    setFavoriteRecipes((await getFavoritesAsync()).data);
  };
  useEffect(() => {
    getFavorites();
  }, []);

  const onFavoriteToggled = () => {
    getFavorites();
  };

  return (
    <div className="row justify-content-around my-3">
      {favoriteRecipes.length ? (
        favoriteRecipes.map((recipe) => {
          if (recipe.dishName) {
            return (
              <RecipeCard
                onToggle={() => onFavoriteToggled()}
                key={recipe._id}
                recipe={recipe}
              />
            );
          } else {
            return (
              <ApiRecipeCard
                onToggle={() => onFavoriteToggled()}
                key={recipe._id}
                recipe={recipe}
              />
            );
          }
        })
      ) : (
        <span className="mt-5 text-center bg-warning p-4 col-lg-6 col-md-8 col-sm-10">
          Your favorites is empty, go find some great recipes
        </span>
      )}
    </div>
  );
};

export default Favorites;
