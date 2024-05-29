import axios from "axios";
import React, { FormEvent, ReactHTMLElement, useState } from "react";
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

  const [logoPreview, setLogoPreview] = useState("");
  const [mainImgPreview, setMainImgPreview] = useState("");

  async function getCafe() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCafeData({ ...cafeData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCafeData({ ...cafeData, [name]: files[0] });

      if (name === "logo_url") {
        setLogoPreview(URL.createObjectURL(files[0]));
      } else if (name === "image_url") {
        setMainImgPreview(URL.createObjectURL(files[0]));
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

  return (
    <>
      <div className="cafe">
        <div className="cafe-inner">
          {cafeData ? (
            <>
              <div className="name-row row">
                <label htmlFor="name">Name: </label>
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
                <label htmlFor="phone_number">Phone number: </label>
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
                  <p>Logo: </p>
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
                  <p>Banner: </p>
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
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="your loaction..."
                  value={cafeData.address}
                  onChange={handleInputChange}
                />
                <p>or Choose from Map</p>
                <div className="map"></div>
              </div>
              <div className="workingTime-row row">
                <div className="timeFrom">
                  <label htmlFor="start_working_time">From: </label>
                  <input
                    type="time"
                    name="start_working_time"
                    id="start_working_time"
                    value={cafeData.start_working_time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="timeTo">
                  <label htmlFor="end_working_time">To: </label>
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
                <label htmlFor="has_alcohol">Yes alcohol?</label>
                <input
                  type="checkbox"
                  name="has_alcohol"
                  id="has_alcohol"
                  checked={cafeData.has_alcohol}
                  onChange={handleInputChange}
                />
              </div>

              <button className="createBtn" onClick={handleSubmit}>
                Create Cafe
              </button>
            </>
          ) : (
            <>
              <div className="name-row row">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
                  value={cafeData}
                />
              </div>
              <div className="phone_number-row row">
                <label htmlFor="phone_number">Phone number: </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder="your phone number..."
                />
              </div>
              <div className="logo-row row">
                <p>Logo: </p>
                <div className="img-box">
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    accept="image/jpg, image/png"
                  />
                  <label htmlFor="logo">+</label>
                </div>
              </div>
              <div className="banner-row row">
                <p>Banner: </p>
                <div className="img-box">
                  <input
                    type="file"
                    name="banner"
                    id="banner"
                    accept="image/jpg, image/png"
                  />
                  <label htmlFor="banner">+</label>
                </div>
              </div>
              <div className="location-row row">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="your loaction..."
                />
                <p>or Choose from Map</p>
                <div className="map"></div>
              </div>
              <div className="workingTime-row row">
                <div className="timeFrom">
                  <label htmlFor="start_working_time">From: </label>
                  <input
                    type="time"
                    name="start_working_time"
                    id="start_working_time"
                  />
                </div>
                <div className="timeTo">
                  <label htmlFor="end-time">To: </label>
                  <input type="time" name="end-time" id="end-time" />
                </div>
              </div>
              <div className="alcohol-row row">
                <label htmlFor="alcohol">Yes alcohol?</label>
                <input type="checkbox" name="alcohol" id="alcohol" />
              </div>

              <button className="createBtn">Create Cafe</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cafe;
