import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import Joi from "joi";
import Input from "../common/input";
import httpService from "../../services/httpService";

const ResetPasswordConfirm = () => {
  const params = useParams();
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    setToken(params.token);
  }, []);
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: FormikValidate({
      password: Joi.string().min(8).max(1024).required(),
      confirmPassword: Joi.string().min(8).max(1024).required(),
    }),
    async onSubmit(values) {
      const password = values.password;
      const confirmPassword = values.confirmPassword;
      if (password !== confirmPassword) {
        setError("password need to be the same");
        return;
      }

      try {
        await httpService.put(
          `/resetPassword/confirmPassword/${token}`,
          values
        );
        toast("password changed");
        navigate("/login");
      } catch ({ response }) {
        setError(response.data);
        return;
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
        <h1 className="h3 mb-3 fw-normal">Select new password</h1>

        <Input
          name="password"
          type="password"
          label="Password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        ></Input>

        <Input
          name="password"
          type="password"
          label="ConfirmPassword"
          {...form.getFieldProps("confirmPassword")}
          error={form.touched.confirmPassword && form.errors.confirmPassword}
        ></Input>

        <button className="w-100 mb-1 btn btn-lg btn-primary" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
