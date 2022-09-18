import Input from "../common/input";
import Joi from "joi";
import { useFormik } from "formik";
import FormikValidate from "../custom/formikValidate";
import { useState } from "react";
import { sendContact } from "../../services/contactService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: FormikValidate({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(400)
        .email({ tlds: { allow: false } })
        .required(),

      message: Joi.string().required().min(8).max(1024),
    }),
    async onSubmit(values) {
      try {
        const response = await sendContact(values);
        toast(response.data);
        navigate("/home");
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
          <h1 className="h3 mb-3 fw-normal ">Contact Us</h1>
          <div className="my-4">
            <span className="text-info">Your opinion is important to us</span>
            <br />
            <span className="text-info">
              If you have a problem or just a question
            </span>
            <br />
            <span className="text-info">Don't hesitate and contact us</span>
          </div>

          <Input
            name="name"
            type="text"
            label="Name"
            {...form.getFieldProps("name")}
            error={form.touched.name && form.errors.name}
          ></Input>
          <Input
            name="email"
            type="email"
            label="Email"
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
          ></Input>
          <Input
            name="message"
            type="text"
            label="Message"
            {...form.getFieldProps("message")}
            error={form.touched.message && form.errors.message}
          ></Input>

          <button className="w-100 mb-1 btn btn-lg btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
      <div className="contact mt-5">
        <div className="w-100 text-center">
          <a
            className="contactLink"
            href="mailto:unirexContact@gmail.com"
            target="_blank"
          >
            Click here to send an email to us
            <br />
            unirexContact@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;

{
  /* <PageHeader
  title="Contact with us"
  description="if you have any questions or a problem, please contact us"
></PageHeader> */
}
