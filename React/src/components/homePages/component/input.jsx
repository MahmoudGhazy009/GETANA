import React from "react";

const Input = ({ name, label, placeholder = "", error, ...rest }) => {
  console.log(name, label, placeholder, error, rest, "rest");
  return (
    <div className="input-group mb-3" style={{ width: "50%", margin: "auto" }}>
      <div className="input-group-prepend">
      </div>
      <input
        {...rest}
        name={name}
        id={name}
        placeholder={placeholder}
        className="form-control"
        className="form-control"
        aria-label="Username"
        aria-describedby="basic-addon"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
