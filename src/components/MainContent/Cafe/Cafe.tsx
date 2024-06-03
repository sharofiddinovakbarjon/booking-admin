import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import upload from "../../../assets/images/upload.png";

const Cafe: React.FC = () => {
  const [cafeData, setCafeData] = useState<Omit<CafeInfo, "id">>({
    name: "",
    image_url: null,
    logo_url: null,
    has_alcohol: false,
    phone_number: "",
    address: "",
    latitude: "42.256812",
    longitude: "40.145642",
    start_working_time: "",
    end_working_time: "",
  });

  const [cafeCreated, setCafeCreated] = useState(false);

  const [logoPreview, setLogoPreview] = useState("");
  const [mainImgPreview, setMainImgPreview] = useState("");

  // Refs
  // ChangeField type
  interface ChangeField {
    name: boolean;
    phone_number: boolean;
    address: boolean;
    start_working_time: boolean;
    end_working_time: boolean;
    has_alcohol: boolean;
  }

  const [changeField, setChangeField] = useState<ChangeField>({
    name: false,
    address: false,
    phone_number: false,
    start_working_time: false,
    end_working_time: false,
    has_alcohol: false,
  });

  async function getCafe() {
    try {
      const response = await axios.get(
        "https://cafe-booking.uz/api/v1/cafes/get-cafe/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        const data = response.data;
        setCafeData(data);
        setCafeCreated(true);
      } else {
        setCafeCreated(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCafeData({ ...cafeData, [name]: type === "checkbox" ? checked : value });

    if (cafeCreated && cafeData) {
      setChangeField({ ...changeField, [name]: true });
    }
  };

  const handlePatch = async (name: string) => {
    const formData = new FormData();

    formData.append(name, cafeData[name as keyof Omit<CafeInfo, "id">] + "");
    if (cafeCreated && cafeData) {
      try {
        const response = await axios.patch(
          "https://cafe-booking.uz/api/v1/cafes/patch-cafe/",
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setChangeField({ ...changeField, [name]: false });
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCafeData({ ...cafeData, [name]: files[0] });

      if (name === "logo_url") {
        setLogoPreview(URL.createObjectURL(files[0]));

        if (cafeCreated && cafeData) {
          const formData = new FormData();
          formData.append(name, files[0]);
          try {
            const response = await axios.patch(
              "https://cafe-booking.uz/api/v1/cafes/patch-cafe/",
              formData,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      } else if (name === "image_url") {
        setMainImgPreview(URL.createObjectURL(files[0]));

        if (cafeCreated && cafeData) {
          const formData = new FormData();
          formData.append(name, files[0]);
          console.log(files[0]);
          try {
            const response = await axios.patch(
              "https://cafe-booking.uz/api/v1/cafes/patch-cafe/",
              formData,
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );

            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in cafeData) {
      const value = cafeData[key as keyof Omit<CafeInfo, "id">];
      if (value && (typeof value === "string" || typeof value === "object")) {
        formData.append(key, value);
      } else if (value && typeof value === "boolean") {
        formData.append(key, String(value));
      }
    }

    try {
      const response = await axios.post(
        "https://cafe-booking.uz/api/v1/cafes/post-cafe/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Delete Cafe
  const handleDeleteCafe = async () => {
    try {
      const response = await axios.delete(
        "https://cafe-booking.uz/api/v1/cafes/delete-cafe/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        navigate("/");
        localStorage.removeItem("location");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCafe();
  }, [token]);

  return (
    <>
      <div className="cafe">
        <div className="cafe-inner content-inner">
          <div className="content-title">
            <p>Ваше Кафе</p>
          </div>
          {cafeCreated ? (
            <>
              <div className="name-row row">
                <label htmlFor="name">Имя: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
                  value={cafeData.name}
                  onChange={handleInputChange}
                />

                {changeField.name && (
                  <button
                    className="confirm-btn"
                    onClick={() => handlePatch("name")}
                  >
                    Подтверждать
                  </button>
                )}
              </div>
              <div className="phone_number-row row">
                <label htmlFor="phone_number">Номер телефона: </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder="your phone number..."
                  value={cafeData.phone_number}
                  onChange={handleInputChange}
                />
                {changeField.phone_number && (
                  <button
                    className="confirm-btn"
                    onClick={() => handlePatch("phone_number")}
                  >
                    Подтверждать
                  </button>
                )}
              </div>
              <div className="images-row">
                <div className="logo-row row">
                  <p>Логотип: </p>
                  <div className="img-box">
                    <img src={cafeData.logo_url + ""} alt="Logo preview" />
                  </div>
                  <input
                    type="file"
                    name="logo_url"
                    id="logo_url"
                    style={{ display: "none" }}
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="logo_url" className="confirm-btn">
                    Изменять
                  </label>
                </div>
                <div className="banner-row row">
                  <p>Изображение: </p>
                  <div className="img-box">
                    <img src={cafeData.image_url + ""} alt="Image preview" />
                  </div>
                  <input
                    type="file"
                    name="image_url"
                    id="image_url"
                    style={{ display: "none" }}
                    accept="image/png, image/jpg, unage.jpeg"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="image_url" className="confirm-btn">
                    Изменять
                  </label>
                </div>
              </div>
              <div className="location-row row">
                <label htmlFor="address">Расположение</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="your loaction..."
                  value={cafeData.address}
                  onChange={handleInputChange}
                />
                {changeField.address && (
                  <button
                    className="confirm-btn"
                    onClick={() => handlePatch("address")}
                  >
                    Подтверждать
                  </button>
                )}
                {/* <p>or Choose from Map</p> */}
                <div className="map"></div>
              </div>
              <div className="workingTime-row row">
                <div className="timeFrom">
                  <label htmlFor="start_working_time">От: </label>
                  <input
                    type="time"
                    name="start_working_time"
                    id="start_working_time"
                    value={cafeData.start_working_time}
                    onChange={handleInputChange}
                  />
                  {changeField.start_working_time && (
                    <button
                      className="confirm-btn"
                      onClick={() => handlePatch("start_working_time")}
                    >
                      Подтверждать
                    </button>
                  )}
                </div>
                <div className="timeTo">
                  <label htmlFor="end_working_time">до: </label>
                  <input
                    type="time"
                    name="end_working_time"
                    id="end_working_time"
                    value={cafeData.end_working_time}
                  />
                  {changeField.end_working_time && (
                    <button
                      className="confirm-btn"
                      onClick={() => handlePatch("end_working_time")}
                    >
                      Подтверждать
                    </button>
                  )}
                </div>
              </div>
              <div className="alcohol-row row">
                <label htmlFor="has_alcohol">Есть алкоголь?</label>
                <input
                  type="checkbox"
                  name="has_alcohol"
                  id="has_alcohol"
                  checked={cafeData.has_alcohol}
                  onChange={handleInputChange}
                />
                {changeField.has_alcohol && (
                  <button
                    className="confirm-btn"
                    onClick={() => handlePatch("has_alcohol")}
                  >
                    Подтверждать
                  </button>
                )}
              </div>

              <button className="delete-btn" onClick={handleDeleteCafe}>
                Удалить кафе
              </button>
            </>
          ) : (
            <>
              <div className="name-row row">
                <label htmlFor="name">Имя: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
                  value={cafeData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="phone_number-row row">
                <label htmlFor="phone_number">Номер телефона: </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder="your phone number..."
                  value={cafeData.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="images-row">
                <div className="logo-row row">
                  <p>Логотип: </p>
                  <div className="img-box">
                    {logoPreview ? (
                      <img src={logoPreview} alt="logo" />
                    ) : (
                      <>
                        <input
                          type="file"
                          name="logo_url"
                          id="logo_url"
                          accept="image/jpg, image/png"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="logo_url">
                          <img src={upload} alt="" />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="banner-row row">
                  <p>Баннер: </p>
                  <div className="img-box">
                    {mainImgPreview ? (
                      <img src={mainImgPreview} alt="main image" />
                    ) : (
                      <>
                        <input
                          type="file"
                          name="image_url"
                          id="image_url"
                          accept="image/jpg, image/png"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="image_url">
                          <img src={upload} alt="" />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="location-row row">
                <label htmlFor="location">Локация</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="your loaction..."
                  value={cafeData.address}
                  onChange={handleInputChange}
                />
                <p>или выберите на карте</p>
                <div className="map"></div>
              </div>
              <div className="workingTime-row row">
                <div className="timeFrom">
                  <label htmlFor="start_working_time">От: </label>
                  <input
                    type="time"
                    name="start_working_time"
                    id="start_working_time"
                    value={cafeData.start_working_time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="timeTo">
                  <label htmlFor="end_working_time">До: </label>
                  <input
                    type="time"
                    name="end_working_time"
                    id="end_working_time"
                    value={cafeData.end_working_time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="alcohol-row row">
                <label htmlFor="has_alcohol">Есть алкоголь?</label>
                <input
                  type="checkbox"
                  name="has_alcohol"
                  id="has_alcohol"
                  checked={cafeData.has_alcohol}
                  onChange={handleInputChange}
                />
              </div>

              <button className="createBtn" onClick={handleSubmit}>
                Создать кафе
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cafe;
