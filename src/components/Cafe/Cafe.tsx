import React, { useState } from "react";

const Cafe: React.FC = () => {
  const [cafeName, setCafename] = useState("Cafe Name");
  const [phone, setPhone] = useState("+998904202303");

  return (
    <>
      <div className="cafe">
        <div className="cafe-inner">
          <div className="title-box">
            <label htmlFor="name">Your Cafe name: </label>
            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafename(e.target.value)}
            />
          </div>
          <div className="phone-box">
            <label htmlFor="phone">Phone number: </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="logoImage-box">
            <label htmlFor="logo">Your Logo: </label>
            <div className="img-box"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cafe;
