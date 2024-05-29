import React, { ReactEventHandler, useState } from "react";

const Banner: React.FC = () => {
  const [bannersPreview, setBannersPreview] = useState<string[]>();

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
  };

  return (
    <>
      <div className="banner">
        <div className="content-inner">
          <div className="content-title">
            <p>Your banner</p>
          </div>
          <form>
            <p>Banners: </p>
            <div className="banner-inputBox">
              {bannersPreview?.length! > 0 ? (
                <>
                  {bannersPreview?.map((banner, index) => (
                    <img src={banner} alt="banner" key={`banner-${index}`} />
                  ))}
                </>
              ) : (
                <>
                  <input
                    type="file"
                    name="banners"
                    id="banners"
                    multiple
                    accept="images/jpg, images/png, images/jpeg"
                    style={{ display: "none" }}
                    onChange={handleImagesUpload}
                  />
                  <label htmlFor="banners">Upload</label>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Banner;
