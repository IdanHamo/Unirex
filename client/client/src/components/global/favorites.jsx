import { useEffect } from "react";
import { useState } from "react";
import { getFavoritesAsync } from "../../services/favoriteService";
import RecipeCard from "../common/recipesCard";
const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const getFavorites = async function () {
    setFavoriteRecipes((await getFavoritesAsync()).data);
  };
  useEffect(() => {
    getFavorites();
  }, []);

  const onFavoriteToggled = (recipes) => {
    console.log(recipes);
    getFavorites();
  };

  return (
    <div className="row justify-content-around my-3">
      {favoriteRecipes.length ? (
        favoriteRecipes.map((recipe) => (
          <RecipeCard
            onToggle={onFavoriteToggled}
            key={recipe._id}
            recipe={recipe}
          />
        ))
      ) : (
        <div className="mt-5">
          Your favorites is empty, go find some great recipes
        </div>
      )}
    </div>
  );
};

export default Favorites;
