import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { updateCafeInfo } from "@/store/bookingSlice/bookingSlice";

const Cafe: React.FC = () => {
  const { cafeInfo } = useAppSelector((state) => state.bookingSlice);

  const dispatch = useAppDispatch();

  const handleOnchange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    // setLogo(URL.createObjectURL(target.files[0]));
    dispatch(
      updateCafeInfo({
        ...cafeInfo,
        logo_url: URL.createObjectURL(target.files[0]),
      })
    );

    const formData = new FormData();
    formData.append("image", cafeInfo.logo_url);

    console.log(formData.getAll("image"));
  };

  return (
    <>
      <div className="cafe">
        <div className="cafe-inner">
          <div className="title-box input-box">
            <label htmlFor="name">Your name</label>

            {cafeInfo.name.length === 0 ? (
              <>
                <input
                  type="text"
                  value={cafeInfo.name}
                  name="name"
                  id="name"
                  onChange={(e) =>
                    dispatch(
                      updateCafeInfo({
                        ...cafeInfo,
                        name: e.target.value,
                      })
                    )
                  }
                />
              </>
            ) : (
              <>
                <p className="value">{cafeInfo.name}</p>
                <button className="change-btn">Change name</button>
              </>
            )}
          </div>
          <div className="title-box input-box">
            <label htmlFor="phone">Your phone number</label>
            <p className="value">{cafeInfo.phone_number}</p>
            <button className="change-btn">Change phone</button>
          </div>
          <div className="title-box input-box">
            <label htmlFor="logo">Your logo</label>

            {cafeInfo.logo_url ? (
              <img src={cafeInfo.logo_url} alt="logo-image" id="logoImage" />
            ) : (
              <div className="value img-box">
                <input
                  type="file"
                  name="logo-img"
                  id="logo-img"
                  accept="image/png, image/jpg"
                  onChange={handleOnchange}
                />
                <label htmlFor="logo-img">+</label>
              </div>
            )}
            {/* <button className="change-btn">Change   phone</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cafe;
