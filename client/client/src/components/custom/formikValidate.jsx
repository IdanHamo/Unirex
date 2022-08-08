import Joi from "joi";

export const FormikValidate = (schema) => {
  return (value) => {
    const { error } = Joi.object(schema).validate(value, { abortEarly: false });

    if (!error) {
      return null;
    }

    const errors = {};

    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }

    return errors;
  };
};

export default FormikValidate;
