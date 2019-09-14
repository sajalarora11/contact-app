import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Static content
import "./App.css";

// Components
import Navbar from "./components/layouts/Navbar";
import Login from "./components/routes/auth/Login";
import Dashboard from "./components/routes/home/Dashboard";
import Home from "./components/routes/home/Home";
import Register from "./components/routes/auth/Register";
import ContactState from "./context/Contact/State";
import AuthState from "./context/auth/State";
import PrivateRoute from "./components/routes/auth/PrivateRoute";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/contacts" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
