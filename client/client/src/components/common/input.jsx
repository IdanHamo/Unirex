import classNames from "classnames";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <>
      <div className="form-floating my-3">
        <input
          {...rest}
          id={name}
          className={classNames("form-control", { "is-invalid": error })}
        />
        <div className="invalid-feedback">{error}</div>
        <label htmlFor={name}>{label}</label>
      </div>
    </>
  );
};

export default Input;
