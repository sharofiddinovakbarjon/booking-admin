import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const SideBar: React.FC = () => {
  const handleOpenInnerMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    document.querySelector(".inner_menu")?.classList.toggle("active");
    console.log(e.target);
  };

  return (
    <>
      <div className="sidebar">
        <a href="/" className="title">
          Admin Panel
        </a>
        <ul className="sidebar-content sidebar-menu">
          <li className="sidebar-menu_item">
            <a href={`/?setting`}>Your Cafe</a>
          </li>
          <li className="sidebar-menu_item">
            <a href="/?banner">Cafe Banners</a>
          </li>
          <li className="sidebar-menu_item" onClick={handleOpenInnerMenu}>
            Rooms{" "}
            <span>
              <IoIosArrowForward />
            </span>
            <ul className="inner_menu">
              <li className="inner_item">
                <a href="#">Category-1</a>
              </li>
              <li className="inner_item">
                <a href="#">Category-2</a>
              </li>
              <li className="inner_item">
                <a href="#">Category-2</a>
              </li>
              <li className="inner_item">Add Category</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
