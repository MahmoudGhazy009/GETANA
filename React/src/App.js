import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Home from "./components/homePages/home";
import Footer from "./components/homePages/component/footer";
import NavBar from "./components/homePages/component/navBar";
import About from "./components/homePages/about";
import Feature from "./components/homePages/feature";
import LoginForm from "./components/homePages/login";
import RegisterForm from "./components/homePages/registerForm";
import TweetsRender from "./components/homePages/component/tweetsRender";
import PersonAnalysis from "./components/homePages/Person Analysis";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />

        <NavBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/feature" component={Feature} />
          <Route path="/login" component={LoginForm} />
          <Route path="/registerForm" component={RegisterForm} />
          <Route path="/explore" component={TweetsRender} />
          <Route path="/person" component={PersonAnalysis} />
          <Redirect from="/" exact to="/home" />
        </Switch>
        {/*<div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3 m-3">
            <ProgressBars />
           
            <Graphs />
            <Bubbless />
            <SimpleMap />
          </div>
        </div>*/}
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
