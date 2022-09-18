import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

import {
  getFavoritesAsync,
  toggleAPIFavorite,
} from "../../services/favoriteService";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
const ApiRecipeCard = ({ recipe }, onToggle = () => {}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentRecipeState, setCurrentRecipeState] = useState({});
  useEffect(() => {
    const favorites = async () => {
      const favoritesResult = await getFavoritesAsync();
      const found = favoritesResult.data.findIndex(function (favorite) {
        return favorite.label === recipe.label;
      });
      setIsFavorite(found >= 0);
    };
    favorites();
  }, [isFavorite]);

  useEffect(() => {
    if (recipe._id) {
      const currentRecipe = { ...recipe };
      console.log(currentRecipe);
      setCurrentRecipeState(currentRecipe);
    } else {
      const currentRecipe = { ...recipe, _id: uuidv4() };
      setCurrentRecipeState(currentRecipe);
    }
  }, []);

  const toggleFavoriteHandler = async (id) => {
    let response = await toggleAPIFavorite(id, {
      label: currentRecipeState.label,
      calories: currentRecipeState.calories,
      mealType: currentRecipeState.mealType,
      totalWeight: currentRecipeState.totalWeight,
      _id: currentRecipeState._id,
      cuisineType: currentRecipeState.cuisineType,
      dietLabels: currentRecipeState.dietLabels,
      url: currentRecipeState.url,
      image: currentRecipeState.image,
    });
    const { success, favorites, message } = response.data;
    if (message === "Added Successfully") {
      setIsFavorite(true);
    }
    if (message === "Removed Successfully") {
      setIsFavorite(false);
    }

    toast(message);
    onToggle(favorites);
  };
  return (
    <>
      <div
        className="card my-3 col-sm-12 col-md-3 bg-light "
        style={{ width: "18rem" }}
      >
        <img src={recipe.image} className="card-img-top" alt={recipe.label} />
        <div className="card-body">
          <h5 className="card-title">{recipe.label}</h5>
          <p className="card-text">
            <span>calories : {Math.floor(recipe.calories)}</span>
            <br />
            <span>meal type : {recipe.mealType}</span>
          </p>
        </div>
        <ul className="list-group list-group-flush ">
          <li className="list-group-item bg-light">
            total weight : {Math.floor(recipe.totalWeight)}
          </li>
          <li className="list-group-item bg-light"> {recipe.cuisineType[0]}</li>
          {recipe.dietLabels.length ? (
            <li className="list-group-item bg-light">
              {recipe.dietLabels.map((label) => label)}
            </li>
          ) : null}
        </ul>
        <div className="card-body">
          <a href={recipe.url} className="card-link text-primary">
            Open the recipe
          </a>
        </div>

        {user && (
          <button
            onClick={() => {
              toggleFavoriteHandler(currentRecipeState._id);
            }}
            className="btn btn-block card-link text-warning"
          >
            <i className={isFavorite ? "bi bi-star-fill" : "bi bi-star"}></i>
          </button>
        )}
      </div>
    </>
  );
};

export default ApiRecipeCard;
