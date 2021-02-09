import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalState } from "../context/GlobalContext";
import jwt from "jsonwebtoken";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { toggleLoading, editError, loggedInUser } = useGlobalState();

  function checkAuth() {
    toggleLoading(true);
    console.log(window.location.pathname);
    const token = localStorage.getItem("myToken");
    const authed = localStorage.getItem("authed");
    const didAuth = localStorage.getItem("didAuth");

    if (token) {
      let decoded = jwt.decode(token, { complete: "true" });
      let dateNow = new Date();
      if (decoded.exp * 1000 < dateNow) {
        localStorage.removeItem("myToken");
        localStorage.removeItem("authed");
        localStorage.removeItem("didAuth");
        editError("Please login to view this resource!");
        toggleLoading(false);
        return "error";
      } else {
        if (
          window.location.pathname === "/dashboard" &&
          !didAuth &&
          authed.length > 3
        ) {
          console.log("validate");
          toggleLoading(false);
          return "validate";
        } else if (
          window.location.pathname === "/user/validate" &&
          didAuth &&
          authed.length > 3
        ) {
          console.log("dashboard");
          toggleLoading(false);
          return "dashboard";
        }
        toggleLoading(false);
        return "success";
      }
    } else {
      toggleLoading(false);
      editError("Please login to view this resource!");
      return "error";
    }
  }

  function redirectCheck() {
    if (checkAuth() === "success") {
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      );
    } else if (checkAuth() === "validate") {
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Redirect to="/user/validate" />;
          }}
        />
      );
    } else if (checkAuth() === "dashboard") {
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Redirect to="/dashboard" />;
          }}
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={(props) => {
            return <Redirect to="/" />;
          }}
        />
      );
    }
  }

  return redirectCheck();
};

export default ProtectedRoute;
