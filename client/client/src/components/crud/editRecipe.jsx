import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormikValidate from "../custom/formikValidate";
import crudService, { editRecipe } from "../../services/crudService";
import { pickKeys } from "../../utilities/pickKeys";
import { toast } from "react-toastify";
import httpService from "../../services/httpService";

const EditRecipe = () => {
  const [error, setError] = useState("");
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [ingredientError, setIngredientError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const formDataName = "recipesImage";

  useEffect(() => {
    async function getRecipe() {
      const { data } = await crudService.getById(id);
      await form.setValues(
        pickKeys(data, [
          "dishName",
          "dishDescription",
          "dishInstructions",
          "dishImage",
          "dishPreparationTime",
          "dishDifficulty",
        ])
      );

      setIngredientsArr(data.dishIngredients);
    }

    getRecipe();
  }, [id]);

  useEffect(() => {
    setIngredientsArr(form.values.dishIngredients);
  }, []);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      dishName: "",
      dishDescription: "",
      dishIngredients: [],
      dishInstructions: "",
      dishPreparationTime: "",
      dishDifficulty: "",
    },
    validate: FormikValidate({
      dishName: Joi.string().min(2).max(255).required(),
      dishDescription: Joi.string().min(2).max(2048).required(),
      dishIngredients: Joi.array().items(
        Joi.string().min(2).max(1024).required()
      ),
      dishInstructions: Joi.string().min(2).max(4096).required(),
      dishImage: Joi.string(),
      dishPreparationTime: Joi.string().min(2).max(20).required(),
      dishDifficulty: Joi.string().min(2).max(20).required(),
    }),
    async onSubmit(values) {
      const { ...body } = values;
      body.dishIngredients = ingredientsArr;

      try {
        console.log(body);
        const { data } = await editRecipe(id, { ...body, favoriteNumber: 0 });
        handleUploadFile(data._id);
        toast("recipe updated successfully");

        navigate("/myRecipes");
        window.location.reload();
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response);
        }
      }
    },
  });
  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUploadFile = async (id) => {
    const formData = new FormData();
    formData.append(formDataName, selectedFile);
    await httpService.put(`/cards/createRecipe/image/${id}`, formData);
  };

  function deleteItem(ingredient) {
    const arr = [...ingredientsArr];
    const filter = arr.filter((item) => {
      return item !== ingredient;
    });
    setIngredientsArr(filter);
  }

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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Shift" && e.target.value.length >= 2) {
              const found = ingredientsArr.find((ing) => ing === input);
              if (found) {
                setIngredientError("this ingredient already exist");
                setInput("");
                return;
              }
              setInput(e.target.value);
              setIngredientsArr([...ingredientsArr, input]);
              setInput("");
              setIngredientError("");
            }
          }}
        ></Input>

        {input.length >= 2 && (
          <div>
            <button
              className="btn btn-dark mb-3"
              onClick={() => {
                const found = ingredientsArr.find((ing) => ing === input);
                if (found) {
                  setIngredientError("this ingredient already exist");
                  setInput("");

                  return;
                }
                if (input.length >= 2 && !found) {
                  console.log(input);
                  setIngredientsArr([...ingredientsArr, input]);
                  setInput("");
                  setIngredientError("");
                }
              }}
            >
              add
            </button>
          </div>
        )}
        {ingredientError && (
          <div className="text-danger">{ingredientError}</div>
        )}
        {ingredientsArr.length >= 1 && (
          <>
            <h6>Ingredients</h6>
            <div className="mb-3 text-warning">
              {" "}
              (double click on the ingredient to delete)
            </div>
            <ol className="ingredients-ul">
              {ingredientsArr.map((ingredient) => {
                return (
                  <li
                    className="ingredientsArr"
                    key={ingredient}
                    onDoubleClick={() => {
                      deleteItem(ingredient);
                    }}
                  >
                    {ingredient}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <Input
          name="dishPreparationTime"
          label="Dish Preparation Time"
          {...form.getFieldProps("dishPreparationTime")}
          error={
            form.touched.dishPreparationTime && form.errors.dishPreparationTime
          }
        ></Input>
        <Input
          name="dishDifficulty"
          label="Dish Difficulty"
          {...form.getFieldProps("dishDifficulty")}
          error={form.touched.dishDifficulty && form.errors.dishDifficulty}
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
        <div className="form-group mb-4">
          <input
            type="file"
            name={formDataName}
            onChange={handleFileSelected}
          />
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
