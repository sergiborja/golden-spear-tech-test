import React from "react";
import LandingImage from "./components/LandingImage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import "./Login.sass";
import { Route, withRouter, Redirect } from "react-router-dom";

function Login() {
  return (
    <section className="loginScreen">
      <div className="loginScreen__landingImageComponent">
        <LandingImage></LandingImage>
      </div>
      <div className="loginScreen__registerComponent">
        <Route path="/login-screen/register" component={RegisterForm} />
      </div>
      <div className="loginScreen__loginComponent">
        <Route path="/login-screen/login" component={LoginForm} />
      </div>
    </section>
  );
}

export default Login;
