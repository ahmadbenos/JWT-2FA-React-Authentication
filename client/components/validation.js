import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGlobalState } from "../context/GlobalContext";
import jwt from "jsonwebtoken";
const Validation = () => {
  const { loggedInUser, changeCurrentUser } = useGlobalState();
  const [pin, setPin] = useState();
  const [err, setErr] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser.user) {
      console.log("exist");
    } else {
      const token = localStorage.getItem("myToken");
      const authed = localStorage.getItem("authed");
      if (token) {
        let decoded = jwt.decode(token, { complete: true });
        changeCurrentUser({
          user: {
            id: decoded.payload.id,
            email: decoded.payload.email,
            secret: authed,
          },
          status: "success",
          two_fa_Validated: authed ? true : false,
        });
      }
    }
  }, []);

  async function validateUser() {
    setErr("");
    const submission = await fetch("http://localhost:5000/api/2fa/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret: loggedInUser.user.secret, token: pin }),
    });
    const res = await submission.json();
    if (res.verified) {
      localStorage.setItem("authed", loggedInUser.user.secret);
      localStorage.setItem("didAuth", "true");
      changeCurrentUser({
        ...loggedInUser,
        two_fa_Validated: true,
      });
      history.push("/dashboard");
    } else {
      setErr("PIN is incorrect!");
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center">2FA Activation</h3>
        {err ? (
          <div
            className="alert alert-danger alert-dismissible fade show w-50 m-auto"
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
            {err}
          </div>
        ) : null}
        <p className="text-center">Input the PIN from your authenticator</p>
        <div className="text-center">
          <input
            type="number"
            placeholder="PIN"
            className="form-control w-25 m-auto text-center"
            required
            onChange={(e) => setPin(e.target.value)}
            min={0}
          />
        </div>
        <br />
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={validateUser}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Validation;
