import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import recipesService from "../../services/recipesService";
import { toast } from "react-toastify";

const DeleteRecipe = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const deleteRecipe = async function () {
      await recipesService.deleteRecipe(params.id);
      toast("recipe deleted successfully");
      navigate("/myRecipes");
    };
    deleteRecipe();
  }, []);
  return null;
};

export default DeleteRecipe;
