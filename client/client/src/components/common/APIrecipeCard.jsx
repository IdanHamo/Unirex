const ApiRecipeCard = ({ recipe }) => {
  return (
    <>
      <div className="card my-3 col-sm-12 col-md-3 " style={{ width: "18rem" }}>
        <img src={recipe.image} className="card-img-top" alt={recipe.label} />
        <div className="card-body">
          <h5 className="card-title">{recipe.label}</h5>
          <p className="card-text">
            <span>calories : {Math.floor(recipe.calories)}</span>
            <br />
            <span>meal type : {recipe.mealType}</span>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            total weight : {Math.floor(recipe.totalWeight)}
          </li>
          <li className="list-group-item"> {recipe.cuisineType[0]}</li>
          <li className="list-group-item">
            {recipe.dietLabels.map((label) => label)}
          </li>
        </ul>
        <div className="card-body">
          <a href={recipe.url} className="card-link">
            Open the recipe
          </a>
        </div>
      </div>
    </>
  );
};

export default ApiRecipeCard;
