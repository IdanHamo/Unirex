import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import SignupWithGooglePremium from "./signupWithGooglePremium";

const PremiumRegistration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate: FormikValidate({
      userName: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(400)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string()
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
        )
        .min(8)
        .max(1024)
        .required()
        .messages({
          "string.min": "Must have at least 8 characters",
          "object.regex": "Must have at least 8 characters",
          "string.pattern.base":
            "The password must contain 1 Upper case letter , 1 lower case letter, 1 special character and 4 numbers. Total of 8 characters minimum",
        }),
    }),
    async onSubmit(values) {
      try {
        await createUser({
          ...values,
          premium: true,
          admin: false,
          favorites: [],
        });
        toast("premium account created");
        navigate("/login");
      } catch ({ response }) {
        setError(response.data);
      }
    },
  });
  return (
    <>
      <div className="w-100 m-auto d-flex justify-content-center mt-5">
        <form
          noValidate
          onSubmit={form.handleSubmit}
          className="form-signup text-center"
        >
          <img
            className="mb-4"
            src="images/signup.jpg"
            alt=""
            width="100"
            height="95"
          />
          <h1 className="h3 mb-4 fw-normal">Register as premium to Unirex</h1>

          {error && <div className="alert alert-danger">{error}</div>}
          <Input
            name="userName"
            label="User Name"
            type="text"
            {...form.getFieldProps("userName")}
            error={form.touched.userName && form.errors.userName}
          ></Input>

          <Input
            name="email"
            label="Email Address"
            type="email"
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
          ></Input>

          <Input
            name="password"
            label="Password"
            type="password"
            {...form.getFieldProps("password")}
            error={form.touched.password && form.errors.password}
          ></Input>

          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Sign Up as Premium
          </button>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <SignupWithGooglePremium successCallback={onsubmit} />
      </div>
    </>
  );
};

export default PremiumRegistration;
