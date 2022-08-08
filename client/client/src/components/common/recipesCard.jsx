import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toggleFavorite } from "../../services/favoriteService";

const RecipeCard = ({
  recipe: { _id, dishIngredients, dishDescription, dishName, dishImage },
  onToggle = () => {},
}) => {
  const { user } = useAuth();

  const toggleFavoriteHandler = async (id) => {
    let response = await toggleFavorite(id);
    const { success, favorites } = response.data;
    console.log(favorites);
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

      {user.premium && (
        <div className=" p-2">
          <Link
            to={`/cards/fullRecipe/${_id}`}
            className="card-link text-primary"
          >
            Open recipe
          </Link>

          <Link
            to={`/cards/editRecipe/${_id}`}
            className="card-link text-warning"
          >
            Edit
          </Link>
          <Link to={`/cards/delete/${_id}`} className="card-link text-danger">
            delete
          </Link>
        </div>
      )}
      <button
        onClick={() => {
          toggleFavoriteHandler(_id);
        }}
        className="card-link text-warning"
      >
        <i className="bi bi-star-fill"></i>
      </button>
    </div>
  );
};

export default RecipeCard;
