import React from "react";

const Header = () => {
  return (
    <>
      <h1 className="display-3 text-center">JWT+2FA</h1>
      <div className="text-center">
        <small className="text-muted">
          This is a mini project that uses JWT(route protection) and 2FA(more
          account security)
        </small>
   <p>by Ahmad Tarabein</p>
        <a href="https://github.com/ahmadbenos/JWT-2FA-React-Authentication">
          Github repo link
        </a>
      </div>
    </>
  );
};

export default Header;
