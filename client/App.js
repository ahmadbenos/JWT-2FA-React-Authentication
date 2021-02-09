import "./App.css";
import React, { useEffect } from "react";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ContextProvider } from "./context/GlobalContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthedRoute from "./components/AuthedRoute";
import TwoFactor from "./components/twoFactor";
import Validation from "./components/validation";

function App() {
  return (
    <div className="container">
      <Header />
      <ContextProvider>
        <Router>
          <Switch>
            <AuthedRoute exact path="/" component={Login} />
            <AuthedRoute path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/dashboard/2fa" component={TwoFactor} />
            <ProtectedRoute path="/user/validate" component={Validation} />
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
