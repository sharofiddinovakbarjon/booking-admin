import Modal from "@/components/Modal/Modal";
import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const Rooms: React.FC = () => {
  const [currentRooms, setCurrentRooms] = useState<Room[]>([]);
  const [roomFormData, setRoomFormData] = useState<CreateRoomData>({
    name: "",
    image_url: null,
    capacity: 0,
    price: 0,
    room_category_id: "",
  });
  const [modal, setModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  // Refs
  const cafeID = useRef("");
  const room_category_id = useRef("");

  // Variabels
  let location = useLocation().search.substring(1);
  const token = localStorage.getItem("token") + "";

  const formatPrice = Intl.NumberFormat("en-US");

  const getRooms = async () => {
    try {
      // Get Cafe ID
      const cafeIDResponse = await axios.get(
        "https://cafe-booking.uz/api/v1/cafes/get-cafe/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (cafeIDResponse.status === 200) {
        cafeID.current = cafeIDResponse.data.id;
      }

      // Get All Categories & Rooms
      const categoriesAndRoomsResponse = await axios.get(
        `https://cafe-booking.uz/api/v1/cafes/${cafeID.current}/get-cafe-all-categories-rooms/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (categoriesAndRoomsResponse.status === 200) {
        setCurrentRooms(
          categoriesAndRoomsResponse.data.categories[
            location[location.length - 1]
          ].rooms
        );

        setCategoryName(
          categoriesAndRoomsResponse.data.categories[
            location[location.length - 1]
          ].name
        );

        room_category_id.current =
          categoriesAndRoomsResponse.data.categories[
            location[location.length - 1]
          ].id;

        console.log(room_category_id.current);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Create room API
  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    roomFormData.room_category_id = room_category_id.current;

    const formData = new FormData();

    for (const key in roomFormData) {
      const value = roomFormData[key as keyof CreateRoomData];
      if (key !== "image_url") {
        formData.append(key, String(value));
      }
    }

    if (roomFormData.image_url) {
      for (let i = 0; i < roomFormData.image_url.length; i++) {
        formData.append("image_url", roomFormData.image_url[i]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log("key: ", key, " - value: ", value);
    }
    try {
      const response = await axios.post(
        "https://cafe-booking.uz/api/v1/cafes/cafe/post-room/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setModal(false);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input onchanges

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomFormData({ ...roomFormData, [name]: value });
  };

  const handleInputFileChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const imagesArr: File[] = [];
    for (let i = 0; i < files?.length!; i++) {
      imagesArr.push(files![i]);
    }

    if (roomFormData.image_url && roomFormData.image_url.length > 0) {
      roomFormData.image_url!.map((image) => {
        imagesArr.push(image);
      });
    }

    if (files && files[0]) {
      setRoomFormData((prev) => ({
        ...prev,
        [name]: imagesArr,
      }));
    }
  };

  // Handle Delete banner item
  const handleDeleteImage = (index: number) => {
    setRoomFormData((prev) => ({
      ...prev,
      image_url: prev.image_url!.filter((image, id) => index !== id && image),
    }));
  };

  // Modal close events
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) setModal(false);
  });

  useEffect(() => {
    getRooms();
  }, [modal]);

  return (
    <>
      <div className="rooms">
        <div className="content-inner">
          <>
            <div className="row-1 row">
              {currentRooms?.length > 0 ? (
                <>
                  <h3>
                    Ваши комнаты:{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {categoryName}
                    </span>
                  </h3>
                  <div className="rooms-box">
                    {currentRooms.map((room, index) => (
                      <div className="room" key={index}>
                        <div className="img-box">
                          <img src={room.image_url + ""} alt="room image" />
                        </div>
                        <div className="body">
                          <h1>
                            {index + 1}. {room.name}
                          </h1>
                          <p className="capacity">
                            Вместимость: {room.capacity}
                          </p>
                          <p className="price">
                            Цена:{" "}
                            {formatPrice
                              .format(Number.parseInt(room.price))
                              .replace(",", " ")}{" "}
                            сум
                          </p>
                          <div className="row-edition">
                            <a className="edit" href="#">
                              Изменить
                            </a>
                            <a className="delete" href="#">
                              Удалит
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h3>
                  Нет комнат. Пожалуйста, нажмите кнопку «Добавить комнату»,
                  чтобы добавить твоя комната.
                </h3>
              )}
              <button className="add-room_btn" onClick={() => setModal(true)}>
                Добавить комнату
              </button>
            </div>
          </>
        </div>

        {modal && (
          <Modal>
            <form className="roomForm">
              <div className="name inputBox">
                <label htmlFor="name">Название комнаты: </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={roomFormData!.name}
                  onChange={handleInputChanges}
                  required
                />
              </div>
              <div className="image inputBox">
                <input
                  type="file"
                  id="image_url"
                  name="image_url"
                  accept="image/jpg, image/png, image/jpeg"
                  multiple
                  required
                  onChange={handleInputFileChage}
                />
                <label htmlFor="image_url">Загрузить изображение</label>

                {roomFormData.image_url &&
                roomFormData.image_url.length >= 3 ? (
                  <Swiper
                    className="roomImageSwiper"
                    slidesPerView={3}
                    spaceBetween={30}
                  >
                    {roomFormData.image_url.map((image, index) => (
                      <SwiperSlide className="swiper-item" key={index}>
                        <img src={URL.createObjectURL(image)} alt="image" />
                        <span onClick={() => handleDeleteImage(index)}>
                          &times;
                        </span>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <>
                    {roomFormData.image_url && (
                      <div className="images">
                        {roomFormData.image_url.map((image, index) => (
                          <div className="img" key={index}>
                            <img
                              src={URL.createObjectURL(image)}
                              alt="image"
                              key={index}
                            />
                            <span onClick={() => handleDeleteImage(index)}>
                              &times;
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="capacity inputBox">
                <label htmlFor="capacity">Вместимость: </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={roomFormData.capacity}
                  onChange={handleInputChanges}
                  required
                />
              </div>
              <div className="price inputBox">
                <label htmlFor="price">Цена: </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={roomFormData.price}
                  onChange={handleInputChanges}
                  required
                />
              </div>

              <button onClick={handleCreateRoom}>Добавить</button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Rooms;
