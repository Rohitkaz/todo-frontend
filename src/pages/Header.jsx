import React from "react";
import { Link, Outlet } from "react-router-dom";
//import "../style.css";
import "../routes.css";
const Header = () => {
  return (
    <>
      <div className="Header">
        <div>WELCOME</div>
        <div className="headerb">
          <Link to="/" className="headerbuttons">
            Login
          </Link>
          <Link to="/Register" className="headerbuttons">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
export default Header;
