import React from "react";
import Joi from "joi-browser";
import Form from "./component/form";
import { getToken } from "../../servics/authService";

class RegisterForm extends Form {
  state = {
    data: {
      sex: "",
      password: "",
      twitterUserName: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    errors: {},
    sex: [{ _id: "Male", name: "Male" }, { _id: "Female", name: "Female" }]
  };

  schema = {
    firstName: Joi.string()
      .required()
      .min(3)
      .max(20)
      .label("FirstName"),
    lastName: Joi.string()
      .required()
      .min(3)
      .max(20)

      .label("LastName"),
    password: Joi.string()
      .required()
      .min(8)
      .max(24)
      .label("Password"),
    twitterUserName: Joi.string()
      .required()
      .min(3)
      .max(50)

      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .max(255)
      .label("Email"),
    sex: Joi.string()
      .required()
      .label("Sex")
  };
  doSubmit = async () => {
    // Call the server
    const { data } = this.state;
    // const token = await getToken("users", data);

    try {
      const token = await getToken("/users", data);
      if (token) window.location = "/login";
      // console.log(data, token);
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
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
            {this.renderInput("firstName", "FirstName", "", "FirstName")}
            {this.renderInput("lastName", "LastName", "", "LastName")}
            {this.renderInput(
              "twitterUserName",
              "twitterUserName",
              "",
              "Twiter User Name "
            )}
            {this.renderInput("email", "Email", "mail", "E-mail")}
            {this.renderInput("password", "Password", "password", "password")}
            {this.renderSelect("sex", "Sex", this.state.sex)}

            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
