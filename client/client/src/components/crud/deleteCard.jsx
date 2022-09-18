import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import crudService from "../../services/crudService";
import { toast } from "react-toastify";

const DeleteRecipe = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const deleteRecipe = async function () {
      await crudService.deleteRecipe(params.id);
      toast("recipe deleted successfully");
      navigate("/myRecipes");
    };
    deleteRecipe();
  }, []);
  return null;
};

export default DeleteRecipe;
