import { useGetCafeQuery } from "@/store/apiRTK";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner: React.FC = () => {
  const [cafeData, setCafeData] = useState<CafeInfo>();
  const [banners, setBanners] = useState<File[]>([]);
  const [bannerApplied, setBannerApplied] = useState(false);

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const filesArray = Array.from(files!);
    setBanners((prev) => prev.concat(filesArray));
  };

  const token = localStorage.getItem("token") + "";

  const { data, isSuccess } = useGetCafeQuery(token);

  useEffect(() => {
    if (isSuccess) {
      setCafeData(data);
    }
  }, [data]);

  // Handle Delete banner item
  const handleDeleteBanner = (index: number) => {
    setBanners((prev) => prev.filter((item, id) => id !== index && item));
  };

  // Handle submit Banners
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < banners.length; i++) {
      formData.append(
        "images",
        new Blob(banners, { type: "image/jpg, image/jpeg, image/png" })
      );
    }

    const response = await axios.post(
      "https://cafe-booking.uz/api/v1/cafes/post-cafe-banner/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setBannerApplied(true);
    }

    console.log(response);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  // Get Banners
  const getBanners = async () => {
    if (bannerApplied) {
      try {
        const response = await axios.get("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, [bannerApplied]);

  return (
    <>
      <div className="banner">
        <div className="content-inner">
          <div className="content-title">
            <p>Your banner</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-top">
              <p>Banners:</p>
              <input
                type="file"
                name="banner-img"
                id="banner-img"
                onChange={handleImagesUpload}
                style={{ display: "none" }}
                multiple
                accept="image/jpg, image/png, image/jpeg"
              />
              <label htmlFor="banner-img">Add Banner</label>
            </div>

            <Swiper
              className="bannerSwiper"
              autoplay={{ delay: 1000 }}
              slidesPerView={banners.length > 3 ? 3 : banners.length}
              spaceBetween={50}
            >
              {banners.map((banner, index) => (
                <SwiperSlide
                  className="swiper-item"
                  key={`banner-${index}`}
                  style={banners.length < 3 ? { height: 600 } : {}}
                >
                  <img
                    src={URL.createObjectURL(banner)}
                    alt="banner-image"
                    style={banners.length < 3 ? { height: 600 } : {}}
                  />
                  <span onClick={() => handleDeleteBanner(index)}>&times;</span>
                </SwiperSlide>
              ))}
            </Swiper>

            {banners.length > 0 && bannerApplied ? (
              <>
                <button className="apply-btn">Apply</button>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
