import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import SignupWithGoogle from "../authentication/signUpWithGoogle";

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
        navigate("/home");
        toast("Logged in successfully!");
        // window.location.reload();
      } catch ({ response }) {
        setError(response.data);
      }
    },
  });

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <div className="w-100 m-auto d-flex justify-content-center mt-5">
        <form
          noValidate
          className="form-signin text-center"
          onSubmit={form.handleSubmit}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          <img
            className="mb-4"
            src="images/signup.jpg"
            alt=""
            width="100"
            height="95"
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

          <button className="w-100 mb-1 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>

          <div className="reset-button mb-4 text-end">
            <Link
              to="/resetPassword"
              className="text-primary text-decoration-underline"
            >
              reset password
            </Link>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <SignupWithGoogle successCallback={onsubmit} />
      </div>
    </>
  );
};

export default Login;
