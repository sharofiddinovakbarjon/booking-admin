import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const SideBar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleOpenInnerMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    document.querySelector(".inner_menu")?.classList.toggle("active");
    console.log(e.target);
  };

  const token = localStorage.getItem("token");

  const getAllCategories = async () => {
    try {
      const cafeIDResponse = await axios.get(
        "https://cafe-booking.uz/api/v1/cafes/get-cafe/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (cafeIDResponse.status === 200) {
        const categoryResponse = await axios.get(
          `https://cafe-booking.uz/api/v1/cafes/${cafeIDResponse.data.id}/get-cafe-all-categories-rooms/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (categoryResponse.status === 200) {
          setCategories(categoryResponse.data.categories);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="sidebar">
        <a href="/" className="title">
          Панель администратора
        </a>
        <ul className="sidebar-content sidebar-menu">
          <li className="sidebar-menu_item">
            <a href={`/?setting`}>Ваше Кафе</a>
          </li>
          <li className="sidebar-menu_item">
            <a href="/?banner">Баннеры кафе</a>
          </li>
          <li className="sidebar-menu_item" onClick={handleOpenInnerMenu}>
            Комнаты{" "}
            <span>
              <IoIosArrowForward />
            </span>
            <ul className="inner_menu">
              {categories.map((category, index) => (
                <li className="inner_item" key={index}>
                  <a
                    href={`/?room-${index}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {index + 1}. {category.name}
                  </a>
                </li>
              ))}
              <li className="inner_item">
                <a href="/?add-category">Добавить категорию</a>
              </li>
            </ul>
          </li>
          <div className="sidebar-menu_item">
            <a href="/?orders">Заказы</a>
          </div>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
