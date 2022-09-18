import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import crudService from "../../services/crudService";

const FullRecipe = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async function () {
      const { data } = await crudService.viewRecipe(params.id);
      setRecipe(data);
    };
    getRecipe();
  }, []);

  return (
    <>
      {recipe && (
        <div className="row mt-5">
          <div className="col-md-7">
            <h1 className="text-center">{recipe.dishName}</h1>
            <p>{recipe.dishDescription}</p>
            <hr />
            <div className="info">
              <span className="m-3">
                <i className="bi bi-clock-fill text-danger"></i> &nbsp;
                {recipe.dishPreparationTime}
              </span>
              <span>
                <i className="fa-solid fa-utensils text-warning"></i> &nbsp;
                {recipe.dishDifficulty}
              </span>
            </div>
            <h3 className="my-5" style={{ color: "lightblue" }}>
              Ingredients
            </h3>
            <ol className="mt-4">
              {recipe.dishIngredients &&
                recipe.dishIngredients.map((ingredient) => {
                  return (
                    <li className="ingredient-item" key={ingredient}>
                      {ingredient}
                    </li>
                  );
                })}
            </ol>
          </div>
          <div className="col-md-5">
            <img
              className="recipe-image"
              src={recipe.dishImage}
              alt={recipe.dishName}
            />

            <div className="my-5">
              <h3 className="text-center mb-4" style={{ color: "lightblue" }}>
                Instructions
              </h3>
              {recipe.dishInstructions}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// <>
//   {recipe && (
//     <div>
//       <h1 className="text-center mt-5">{recipe.dishName}</h1>
//       <img
//         src={recipe.dishImage && recipe.dishImage}
//         alt={recipe.dishName}
//       />
//       <div className="mt-5">
//         <h3>Ingredients</h3>
//         <ul className="mt-5 ps-5">
//           {recipe.dishIngredients &&
//             recipe.dishIngredients.map((ingredient) => {
//               return <li key={Math.random()}>{ingredient}</li>;
//             })}
//         </ul>
//       </div>
//       <div className="instructions my-5">
//         {recipe.dishInstructions && recipe.dishInstructions}
//       </div>
//     </div>
//   )}
// </>

export default FullRecipe;
