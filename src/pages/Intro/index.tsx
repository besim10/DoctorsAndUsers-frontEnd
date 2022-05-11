import { FC } from "react";
import "./style.css";
import bannerImage from "../../app/images/banner_img.png";
const Intro: FC = () => {
  return (
    <>
      <div className="intro-container">
        <div className="info-section">
          <h1>HOSPITAL MANAGEMENT SYSTEM</h1>
        </div>
        <div className="image-section">
          <img src={bannerImage} alt="banner-img" />
        </div>
      </div>
    </>
  );
};

export default Intro;
