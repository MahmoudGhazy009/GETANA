import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getToken } from "../../services/movieService";
import jwtDecode from "jwt-decode";

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

  doSubmit = async () => {
    const { data } = this.state;
    // const token = await getToken("users", data);

    try {
      const { data: token } = await getToken("auth", data);
      localStorage.setItem("tokenKey", token.token);
      const decode = jwtDecode(token.token);
      console.log({ token, decode });

      if (token) window.location = "/";
    } catch (ex) {
      //   if (ex.response && ex.response.status === 400) {
      //     const errors = { ...this.state.errors };
      //     errors.username = ex.response.data;
      //     this.setState({ errors });
      //   }
    }
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
