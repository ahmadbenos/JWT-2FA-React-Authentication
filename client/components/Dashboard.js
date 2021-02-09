import React, { useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { useHistory, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

const Dashboard = () => {
  const {
    loggedInUser,
    editSuccess,
    success,
    changeCurrentUser,
  } = useGlobalState();
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

  //! sign out function
  function signOut() {
    localStorage.removeItem("myToken");
    localStorage.removeItem("authed");
    localStorage.removeItem("didAuth");
    editSuccess("Signed out successfully!");
    history.push("/");
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-center">Dashboard</h2>
        {/* //! 2FA notice */}
        {!loggedInUser.user.secret ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>
              You have not activated 2FA yet!{" "}
              <Link to="/dashboard/2fa">
                Please activate now for better account security
              </Link>{" "}
            </strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
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
        {/* //! */}
        <p className="text-center" style={{ color: "blue", fontSize: 24 }}>
          {loggedInUser.user.email}
        </p>
        <div className="text-center">
          <button className="btn btn-outline-danger" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
