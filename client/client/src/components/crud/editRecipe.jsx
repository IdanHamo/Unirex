import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormikValidate from "../custom/formikValidate";
import recipesService, { editRecipe } from "../../services/recipesService";
import { pickKeys } from "../../utilities/pickKeys";
import { toast } from "react-toastify";

const EditRecipe = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function getRecipe() {
      const { data } = await recipesService.getById(id);

      form.setValues(
        pickKeys(data, [
          "dishName",
          "dishDescription",
          "dishIngredients",
          "dishInstructions",
          "dishImage",
        ])
      );
    }

    getRecipe();
  }, [id]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      dishName: "",
      dishDescription: "",
      dishIngredients: [],
      dishInstructions: "",
      dishImage: "",
    },
    validate: FormikValidate({
      dishName: Joi.string().min(2).max(255).required(),
      dishDescription: Joi.string().min(2).max(2048).required(),
      dishIngredients: Joi.string().min(2).max(1024).required(),
      dishInstructions: Joi.string().min(2).max(4096).required(),
      dishImage: Joi.string().min(11).max(1024).allow("").uri().required(),
    }),
    async onSubmit(values) {
      const { dishIngredients, ...body } = values;
      const ingredients = dishIngredients;
      const ingredientsArray = ingredients.split(" ");
      body.dishIngredients = ingredientsArray;

      try {
        await editRecipe(id, body);
        toast("recipe updated successfully");

        navigate("/myRecipes");
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response);
        }
      }
    },
  });

  return (
    <div className="w-100 m-auto d-flex justify-content-center mt-5">
      <form
        noValidate
        className="form-card text-center"
        onSubmit={form.handleSubmit}
      >
        {error && <div className="alert alert-danger">{error.message}</div>}

        <h1 className="h3 mb-3 fw-normal">fill the recipe details</h1>

        <Input
          name="dishName"
          label="Dish Name"
          {...form.getFieldProps("dishName")}
          error={form.touched.dishName && form.errors.dishName}
        ></Input>

        <Input
          name="dishDescription"
          label="Dish Description"
          {...form.getFieldProps("dishDescription")}
          error={form.touched.dishDescription && form.errors.dishDescription}
        ></Input>

        <Input
          name="dishIngredients"
          label="Dish Ingredients"
          {...form.getFieldProps("dishIngredients")}
          error={form.touched.dishIngredients && form.errors.dishIngredients}
        ></Input>

        <Input
          name="dishImage"
          label="Dish Image"
          {...form.getFieldProps("dishImage")}
          error={form.touched.dishImage && form.errors.dishImage}
        ></Input>

        <div className="form-group mb-4">
          <label htmlFor="dishInstructions">Instructions</label>
          <textarea
            className="form-control"
            id="dishInstructions"
            rows="3"
            {...form.getFieldProps("dishInstructions")}
            error={
              form.touched.dishInstructions && form.errors.dishInstructions
            }
          ></textarea>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
