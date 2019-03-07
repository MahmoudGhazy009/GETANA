import React from "react";
import Joi from "joi-browser";
import Form from "./component/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6 col-md-offset-3 m-3">
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
