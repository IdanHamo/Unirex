import PageHeader from "../common/page-header";
import config from "../../config/config.json";
import { useEffect, useState } from "react";
import ApiRecipeCard from "../common/APIrecipeCard";
import { getAllRecipes } from "../../services/crudService";
import RecipeCard from "../common/recipesCard";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";


const RecipesContainer = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [urlLink, setUrlLink] = useState("");
  const [prevPages, setPrevPages] = useState([]);

  const appID = process.env.REACT_APP_API_APP_ID;
  const appKey = process.env.REACT_APP_API_APP_KEY;
  const { user } = useAuth();

  const ApiFetch = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${appID}&app_key=${appKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPrevPages([]);
      setPrevPages((oldArray) => [...oldArray, url]);
      if (data.hits.length) {
        setRecipes(data.hits);
        setError("");
      } else {
        setError("no results found");
      }
      if (data.hits.length >= 20) {
        setUrlLink(data._links.next.href);
      }
    } catch (e) {
      setError(e);
    }
  };

  const onButtonClick = async () => {
    try {
      const response = await fetch(urlLink);
      const data = await response.json();
      if (data._links.next.href) {
        setPrevPages((oldArray) => [...oldArray, urlLink]);
        setUrlLink(data._links.next.href);
        setRecipes(data.hits);
      }
    } catch (e) {
      setError(e);
    }
  };

  const onPreviousClick = async () => {
    try {
      const prev = prevPages[prevPages.length - 2];
      const response = await fetch(prev);
      const data = await response.json();
      setUrlLink(data._links.next.href);
      setRecipes(data.hits);
      prevPages.pop();
    } catch (e) {
      setError(e);
    }
  };

  const onClick = async () => {
    ApiFetch();
    const usersRecipesFetch = await getAllRecipes(input);
    setUserRecipes(usersRecipesFetch.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlLink]);

  return (
    <div>
      <PageHeader
        title="Our recipes"
        description="just search what you want to make and you will find the best recipes"
      ></PageHeader>

      {error && (
        <div className="d-flex justify-content-center">
          <div className="alert alert-danger my-5 text-center p-4 col-xl-4 col-lg-6 col-md-8 col-sm-10 ">
            {error}
          </div>
        </div>
      )}

      <div className="search text-center mt-4">
        <input
          className="input-group-text d-inline-block"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <button className="ms-3 btn btn-dark" onClick={onClick}>
          Search
        </button>
      </div>

      {recipes.length ? (
        <>
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
          {recipes.length >= 20 && (
            <div className="text-center">
              <button
                className="btn btn-dark"
                onClick={onPreviousClick}
                disabled={prevPages.length <= 1}
              >
                previous
              </button>
              <button className="btn btn-dark mx-5" onClick={onButtonClick}>
                next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-5">No results</div>
      )}
      <hr className="mt-5" />
      <h2 className=" text-center mt-3">Other Users recipes</h2>

      {user ? (
        userRecipes.length ? (
          <div className="row justify-content-around my-3">
            {userRecipes.map((recipe) => {
              return (
                <RecipeCard key={Math.random()} recipe={recipe}></RecipeCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-5">No results</div>
        )
      ) : (
        <div className="text-center mt-5">Login to see results</div>
      )}
      {!user && (
        <>
          <div className="mt-5 text-center d-block">
            <span className="m-3">
              <Link
                className="home-links  bg-primary p-3 text-white"
                to="/register"
              >
                Register
              </Link>
            </span>
            <span className="m-3">
              <Link
                className="home-links  bg-primary text-white p-3"
                to="/login"
              >
                Login
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesContainer;
