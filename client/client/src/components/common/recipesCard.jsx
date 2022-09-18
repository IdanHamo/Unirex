import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import {
  getFavoritesAsync,
  toggleFavorite,
} from "../../services/favoriteService";

const RecipeCard = ({
  recipe: {
    _id,
    dishIngredients,
    dishDescription,
    dishName,
    dishImage,
    user_id,
  },
  onToggle = () => {},
}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = async () => {
      const favoritesResult = await getFavoritesAsync();

      const found = favoritesResult.data.findIndex(function (favorite) {
        return favorite._id.toString() === _id;
      });
      setIsFavorite(found >= 0);
    };
    favorites();
  }, [isFavorite]);

  const toggleFavoriteHandler = async (id) => {
    let response = await toggleFavorite(id);
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
    <div key={_id} className="card mx-0 my-3" style={{ width: "18rem" }}>
      <img src={dishImage} className="card-img-top" alt={dishName} />
      <div className="card-body">
        <h5 className="card-title">{dishName}</h5>
        <p className="card-text">{dishDescription}</p>
        <hr />
        <p className="h4">Ingredients</p>
        <span>{dishIngredients.join(", ")}</span>
      </div>

      <div className=" p-2">
        <Link
          to={`/cards/fullRecipe/${_id}`}
          className="card-link text-primary"
        >
          Open recipe
        </Link>

        {user._id === user_id ? (
          <>
            <Link
              to={`/cards/editRecipe/${_id}`}
              className="card-link text-warning"
            >
              Edit
            </Link>
            <Link to={`/cards/delete/${_id}`} className="card-link text-danger">
              delete
            </Link>
          </>
        ) : (
          ""
        )}
      </div>

      {
        <button
          onClick={() => {
            toggleFavoriteHandler(_id);
          }}
          className="btn btn-block card-link text-warning"
        >
          <i className={isFavorite ? "bi bi-star-fill" : "bi bi-star"}></i>
        </button>
      }
    </div>
  );
};

export default RecipeCard;
