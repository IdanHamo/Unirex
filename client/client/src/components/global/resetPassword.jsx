import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import Joi from "joi";
import Input from "../common/input";
import httpService from "../../services/httpService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
    },
    validate: FormikValidate({
      email: Joi.string()
        .min(6)
        .max(400)
        .email({ tlds: { allow: false } })
        .required(),
    }),
    async onSubmit(values) {
      try {
        await httpService.post("/resetPassword/", values);
        toast("check your email");
        navigate("/");
      } catch ({ response }) {
        setError(response.data);
      }
    },
  });
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
        <h1 className="h3 mb-3 fw-normal">Fill your email</h1>

        <Input
          name="email"
          type="email"
          label="Email"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        ></Input>

        <button className="w-100 mb-1 btn btn-lg btn-primary" type="submit">
          Send an email
        </button>
      </form>
    </div>
  );
};


export default ResetPassword;
