import { useGetCafeQuery } from "@/store/apiRTK";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner: React.FC = () => {
  const [cafeData, setCafeData] = useState<CafeInfo>();
  const [banners, setBanners] = useState<{ image_url: string }[]>([]);
  const [bannerApplied, setBannerApplied] = useState(false);

  const handleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const formData = new FormData();

      try {
        const response = await axios.post(
          "https://cafe-booking.uz/api/v1/cafes/post-cafe-banner/",
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setBanners(response.data.cafe_banners);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  // Get Banners
  const getBanners = async () => {
    if (token) {
      try {
        const response = await axios.get(
          "https://cafe-booking.uz/api/v1/cafes/cafe/get-list-cafe-banner/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setBanners(response.data.cafe_banners);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <>
      <div className="banner">
        <div className="content-inner">
          <div className="content-title">
            <p>Your banner</p>
          </div>
          <form>
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
                    src={banner.image_url }
                    alt="banner-image"
                    style={banners.length < 3 ? { height: 600 } : {}}
                  />
                  <span onClick={() => handleDeleteBanner(index)}>&times;</span>
                </SwiperSlide>
              ))}
            </Swiper>
          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
