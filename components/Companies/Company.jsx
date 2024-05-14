import React from "react";
import Image from "next/image";
import Styles from "@/styles/Company.module.css";
import image1 from "@/public/assets/Companies/image1.png";
import image2 from "@/public/assets/Companies/image2.png";
import image3 from "@/public/assets/Companies/image3.png";
import image4 from "@/public/assets/Companies/image4.png";
import image5 from "@/public/assets/Companies/image5.png";
import image6 from "@/public/assets/Companies/Image6.png";
import image7 from "@/public/assets/Companies/Image7.png";
import image8 from "@/public/assets/Companies/Image8.png";
import image9 from "@/public/assets/Companies/image9.png";
  
const Company = () => {
  return (
    <div className={Styles.companies_container}>
      <div className="pt-8 flex justify-center items-center font-medium text-3xl px-4 sm:px-2 2xl:text-5xl ">
        <span>Empowering Over 250 companies worldwide</span>
      </div>
      <div className={Styles.image_container}>
        <div className={Styles.images}>
          <div className={Styles.image1}>
            <Image src={image1} alt="Company Image" />
          </div>
        </div> 
        <div className={Styles.images}>
          <div className={Styles.image2}>
            <Image src={image2} alt="Company Image" />
          </div> 
        </div>
        <div className={Styles.images}>
          <div className={Styles.image3}>
            <Image src={image3} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image4}>
            <Image src={image4} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image5}>
            <Image src={image5} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image6}>
            <Image src={image6} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image7}>
            <Image src={image7} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image8}>
            <Image src={image8} alt="Company Image" />
          </div>
        </div>
        <div className={Styles.images}>
          <div className={Styles.image9}>
            <Image src={image9} alt="Company Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
