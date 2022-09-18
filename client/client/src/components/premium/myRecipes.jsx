import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import recipesService from "../../services/crudService";
import PageHeader from "../common/page-header";
import RecipeCard from "../common/recipesCard";
const MyRecipes = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const { data } = await recipesService.getAll();
      setCards(data);
    }
    getCards();
  }, []);
  return (
    <>
      <PageHeader title="Create your own recipes"></PageHeader>

      <div className="row text-center h4 ">
        <Link className="text-primary" to="/createRecipe">
          click here to create recipe
        </Link>
      </div>
      <hr className="mt-5" />
      <h2 className="text-center mt-5">My recipes</h2>

      <div className="container">
        <div className="row justify-content-around my-3">
          {cards.map((card) => {
            return <RecipeCard key={card._id} recipe={card}></RecipeCard>;
          })}
        </div>
      </div>
    </>
  );
};

export default MyRecipes;
