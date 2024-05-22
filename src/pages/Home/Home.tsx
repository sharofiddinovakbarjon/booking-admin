import SideBar from "@/components/SideBar/SideBar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <section className="section-home container">
        <div className="inner">
          <SideBar />
        </div>
      </section>
    </>
  );
};

export default Home;
