import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { updateCafeInfo } from "@/store/bookingSlice/bookingSlice";

const Cafe: React.FC = () => {
  const [cafeCreated, setCafeCreated] = useState(false);

  // Dispatch
  const dispatch = useAppDispatch();

  // Cafe Info
  const { cafeInfo } = useAppSelector((state) => state.bookingSlice);

  useEffect(() => {
    for (let el in cafeInfo) {
      if (!el) {
        setCafeCreated(true);
      } else {
        setCafeCreated(false);
      }
    }
  }, []);

  return (
    <>
      <div className="cafe">
        <div className="cafe-inner">
          {!cafeCreated ? (
            <>
              <div className="name-row row">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
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
                  <label htmlFor="start-time">From: </label>
                  <input type="time" name="start-time" id="start-time" />
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
          ) : (
            <>
              <div className="name-row row">
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="your name..."
                  value={cafeInfo.name}
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
                  <label htmlFor="start-time">From: </label>
                  <input type="time" name="start-time" id="start-time" />
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
