import React, { createContext, useContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import jwt from "jsonwebtoken";

const mainContext = createContext();

export const useGlobalState = () => {
  return useContext(mainContext);
};

export const ContextProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({ msg: "", status: "" });
  const [loggedInUser, setLoggedInUser] = useState({
    user: "",
    status: "",
    two_fa_Validated: false,
  });
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);
  //   console.log("test");
  //   const token = localStorage.getItem("myToken");
  //   if (token) {
  //     const decoded = jwt.decode(token, { complete: true });
  //     console.log(decoded.payload.exp);
  //     let dateNow = new Date();
  //     if (decoded.payload.exp * 1000 > dateNow) {
  //       setLoggedInUser({
  //         user: { email: decoded.payload.email, id: decoded.payload.id },
  //         status: "success",
  //       });
  //       return setIsLoading(false);
  //     }
  //     localStorage.removeItem("myToken");
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  const changeRegisterData = (data) => {
    setRegisterData(data);
  };

  const changeCurrentUser = (user) => {
    setLoggedInUser(user);
  };

  const toggleLoading = (status) => {
    setIsLoading(status);
  };

  const editError = (err) => {
    setError(err);
  };

  const editSuccess = (msg) => {
    setSuccess(msg);
  };

  const globalState = {
    registerData,
    loggedInUser,
    changeCurrentUser,
    changeRegisterData,
    toggleLoading,
    error,
    editError,
    editSuccess,
    success,
  };

  return (
    <mainContext.Provider value={globalState}>
      {isloading === true ? (
        <div className="text-center mt-5">
          <Loader type="Puff" color="black" height={80} width={80} />
        </div>
      ) : (
        children
      )}
    </mainContext.Provider>
  );
};
