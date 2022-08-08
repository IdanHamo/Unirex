import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import LoginWithGoogle from "./loginWithGoogle";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormikValidate({
      email: Joi.string()
        .min(6)
        .max(400)
        .email({ tlds: { allow: false } })
        .required(),

      password: Joi.string().required().min(8).max(1024),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        toast("Logged in successfully!");
        navigate("/home");
      } catch ({ response }) {
        setError(response.data);
      }
    },
  });

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="w-100 m-auto d-flex justify-content-center mt-5">
      <form
        noValidate
        className="form-signin text-center"
        onSubmit={form.handleSubmit}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <img
          className="mb-4"
          src="/images/signup.jpg"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <Input
          name="email"
          type="email"
          label="Email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        ></Input>
        <Input
          name="password"
          type="password"
          label="Password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        ></Input>

        <button className="w-100 mb-3 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      <LoginWithGoogle></LoginWithGoogle>
      </form>
    </div>
  );
};

export default Login;
