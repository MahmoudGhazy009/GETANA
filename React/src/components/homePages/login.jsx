import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getToken } from "../../servics/authService";

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
      console.log(token, "token");
      // if (token) window.location = "/";
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
      <div style={{ padding: "150px", background: "#212529" }}>
        <h1
          style={{
            fontFamily: "Just Another Hand,cursive",
            textAlign: "center",
            padding: "30px",
            color: "#FFF"
          }}
        >
          Login
        </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "UserName")}
          {this.renderInput("password", "Password", "password", "Password")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
