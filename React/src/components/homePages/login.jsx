import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import jwtDecode from "jwt-decode";
import { getToken } from "../../servics/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255)
      .label("Email"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { data } = this.state;
    // const token = await getToken("users", data);

    try {
      const token = await getToken("/auth", data);
      localStorage.setItem("tokenKey", token.headers["x-auth-token"]);
      const decode = jwtDecode(token.headers["x-auth-token"]);
      // console.log({ token, decode });
      // console.log(data, "dataaaaa");

      // const token = await getToken("/auth", data);
      // console.log(token.headers["x-auth-token"], "token", token);
      if (token) window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-6 col-md-offset-3 m-3">
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            {this.renderInput("email", "Email", "mail", "E-mail")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
