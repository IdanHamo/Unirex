import PageHeader from "../common/page-header";
import config from "../../config/config.json";
import { useState } from "react";
import ApiRecipeCard from "../common/APIrecipeCard";
import { getAllRecipes } from "../../services/recipesService";
import RecipeCard from "../common/recipesCard";

const RecipesContainer = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  const appID = config.app_ID;
  const appKey = config.app_Key;

  const ApiFetch = async () => {
    try {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appID}&app_key=${appKey}`;

      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.hits);
    } catch (e) {
      setError(e);
    }
  };

  const onClick = async () => {
    ApiFetch();
    const usersRecipesFetch = await getAllRecipes(input);
    setUserRecipes(usersRecipesFetch.data);
  };

  return (
    <div>
      <PageHeader
        title="Our recipes"
        description="just search what you want to make and you will find the best recipes"
      ></PageHeader>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search text-center mt-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={onClick}>Search</button>
      </div>

      {recipes.length ? (
        <div className="row justify-content-around my-3">
          {recipes.map((recipe) => {
            return (
              <ApiRecipeCard
                key={Math.random()}
                recipe={recipe.recipe}
              ></ApiRecipeCard>
            );
          })}
        </div>
      ) : (
        <div>No results</div>
      )}
      <hr className="mt-5" />
      <h2 className=" text-center mt-3">Other Users recipes</h2>

      {userRecipes.length ? (
        <div className="row justify-content-around my-3">
          {userRecipes.map((recipe) => {
            return (
              <RecipeCard key={Math.random()} recipe={recipe}></RecipeCard>
            );
          })}
        </div>
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default RecipesContainer;
