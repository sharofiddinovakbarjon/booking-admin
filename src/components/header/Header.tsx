import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <h1 className="title"></h1>
            <div className="tools">
              <button className="themeChange">
                <FaMoon />
              </button>
              <div className="profile">
                <IoPersonCircleOutline />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
