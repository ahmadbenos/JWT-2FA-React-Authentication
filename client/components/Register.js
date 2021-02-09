import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalState } from "../context/GlobalContext";
const Register = () => {
  const {
    changeRegisterData,
    toggleLoading,
    editSuccess,
    error,
    editError,
  } = useGlobalState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const history = useHistory();

  const submitInfo = (e) => {
    editError("");
    toggleLoading(true);
    e.preventDefault();
    if (userPassword !== confirmedPassword) {
      editError("Passwords don't match!");
      return toggleLoading(false);
    }

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    })
      .then((res) => res.json())
      .then((dataRes) => {
        if (dataRes.status === "error") {
          editError(dataRes.msg);
          toggleLoading(false);
        } else {
          editSuccess("Registeration Successful!");
          history.push("/");
          changeRegisterData(dataRes);
          toggleLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        editError("A server error occured. Please try again");
        toggleLoading(false);
      });
  };

  return (
    <div>
      <form className="border p-4 w-75 m-auto" onSubmit={submitInfo}>
        <div className="text-center mb-4">
          <h2>Register</h2>
        </div>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
      <div className="text-center">
        <Link to="/" onClick={() => editError("")}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
