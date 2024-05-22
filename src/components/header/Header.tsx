import React, { useState } from "react";
import { IoPersonCircleOutline, IoSettingsSharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Header: React.FC = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
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
              <div
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className={openProfileMenu ? "profile active" : "profile"}
              >
                <IoPersonCircleOutline />
                <span>Admin</span>
                <ul className="info-box">
                  <li>
                    <a href="#">
                      <IoPersonCircleOutline />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <IoSettingsSharp />
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => localStorage.removeItem("userInfo")}
                      href="/"
                    >
                      <IoIosLogOut />
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
