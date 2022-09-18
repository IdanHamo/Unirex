import { useState } from "react";
import { useEffect } from "react";
import http from "../../services/httpService";

const MostFavorite = () => {
  const [sortRecipes, setSortRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
      const { data } = await http.get("cards/getAllCards");
      setSortRecipes(data);
    };
    getRecipes();
  }, []);
  return (
    <div className="d-flex justify-content-center">
      {sortRecipes.length ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">dishName</th>
                <th scope="col">dishDescription</th>
                <th scope="col">dishDifficulty</th>
                <th scope="col">favoriteNumber</th>
                <th scope="col">image</th>
              </tr>
            </thead>
            <tbody>
              {sortRecipes.map((recipe) => {
                return (
                  <tr key={recipe._id} className="text-center">
                    <td className="text-center">{recipe.dishName}</td>
                    <td className="text-center">{recipe.dishDescription}</td>
                    <td className="text-center">{recipe.dishDifficulty}</td>
                    <td className="text-center">{recipe.favoriteNumber}</td>
                    <td className="text-center">
                      <img
                        src={recipe.dishImage}
                        style={{ width: "70px", height: "50px" }}
                        alt={recipe.dishName}
                      ></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 text-center bg-warning p-4 col-lg-3 col-md-4 col-sm-6">
          No Recipes created yet
        </div>
      )}
    </div>
  );
};

export default MostFavorite;
