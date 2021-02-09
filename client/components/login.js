import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useGlobalState } from "../context/GlobalContext";

const Login = () => {
  const {
    registerData,
    changeCurrentUser,
    toggleLoading,
    error,
    editError,
    success,
    editSuccess,
  } = useGlobalState();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();

  function loginUser(e) {
    toggleLoading(true);
    editSuccess("");
    changeCurrentUser({ user: "", status: "", two_fa_Validated: false });
    e.preventDefault();
    editError("");
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((res) => res.json())
      .then((dataRes) => {
        console.log(dataRes);
        if (dataRes.status === "error") {
          editError(dataRes.message);
        } else {
          //! login works
          localStorage.setItem("myToken", dataRes.token);
          localStorage.setItem("authed", dataRes.message.secret);
          changeCurrentUser({
            user: dataRes.message,
            status: dataRes.status,
            two_fa_Validated: false,
          });
          if (dataRes.message.secret) {
            console.log("has secret");
            history.push("/user/validate");
          } else {
            console.log("no secret");
            history.push("/dashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        editError("Server error. Please try again");
      })
      .finally(() => toggleLoading(false));
  }

  return (
    <div>
      <br />
      <form className="border p-4 w-75 m-auto" onSubmit={loginUser}>
        <div className="text-center mb-4">
          <h2>Login</h2>
        </div>
        {success ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {success}
          </div>
        ) : null}
        {error ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {error}
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
      <div className="text-center">
        <Link
          to="/register"
          onClick={() => {
            editError("");
            editSuccess("");
          }}
        >
          Don't have an account? Register Now!
        </Link>
      </div>
    </div>
  );
};

export default Login;
